const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/resumes-storage.json');
const DEFAULT_SAMPLE_FILE = path.join(__dirname, '../data/rosys-default.json');

// Helper to read storage
function getStorage() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const defaultSample = JSON.parse(fs.readFileSync(DEFAULT_SAMPLE_FILE, 'utf-8'));
      fs.writeFileSync(DATA_FILE, JSON.stringify([defaultSample], null, 2));
      return [defaultSample];
    }
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading resumes storage:', err);
    return [];
  }
}

// Helper to save storage
function saveStorage(resumes) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(resumes, null, 2));
  } catch (err) {
    console.error('Error saving resumes storage:', err);
  }
}

// GET all resumes
router.get('/', (req, res) => {
  const list = getStorage().map(r => ({
    id: r.id,
    name: r.name || `${r.personalData?.lastName || ''}, ${r.personalData?.firstName || 'Lebenslauf'}`,
    role: r.personalData?.qualification || 'Pflegefachkraft',
    updatedAt: r.updatedAt || new Date().toISOString(),
    template: r.template || 'rosys-official'
  }));
  res.json({ success: true, count: list.length, resumes: list });
});

// GET default sample
router.get('/default/sample', (req, res) => {
  try {
    const defaultData = JSON.parse(fs.readFileSync(DEFAULT_SAMPLE_FILE, 'utf-8'));
    res.json({ success: true, resume: defaultData });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Could not load default sample' });
  }
});

// GET single resume by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const list = getStorage();
  const found = list.find(r => r.id === id);
  if (found) {
    return res.json({ success: true, resume: found });
  }
  // Return default sample if not found
  try {
    const defaultData = JSON.parse(fs.readFileSync(DEFAULT_SAMPLE_FILE, 'utf-8'));
    res.json({ success: true, resume: defaultData, isFallback: true });
  } catch (err) {
    res.status(404).json({ success: false, error: 'Resume not found' });
  }
});

// POST save or update resume
router.post('/', (req, res) => {
  const resume = req.body;
  if (!resume || !resume.personalData) {
    return res.status(400).json({ success: false, error: 'Invalid resume data' });
  }

  const list = getStorage();
  const id = resume.id || `rosys-cv-${Date.now()}`;
  const now = new Date().toISOString();

  const preparedResume = {
    ...resume,
    id,
    updatedAt: now,
    name: resume.name || `${resume.personalData?.lastName || 'Kandidat'}, ${resume.personalData?.firstName || ''} (${resume.personalData?.qualification || 'Pflege'})`
  };

  const existingIndex = list.findIndex(r => r.id === id);
  if (existingIndex >= 0) {
    list[existingIndex] = preparedResume;
  } else {
    list.unshift(preparedResume);
  }

  saveStorage(list);
  res.json({ success: true, message: 'Resume saved successfully', resume: preparedResume });
});

// DELETE resume
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const list = getStorage();
  const filtered = list.filter(r => r.id !== id);
  saveStorage(filtered);
  res.json({ success: true, message: 'Resume deleted' });
});

module.exports = router;
