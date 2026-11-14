const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');
const { Packer } = require('docx');
const { createDocxFromResume } = require('./docxGenerator');

const DATA_FILE = path.join(__dirname, '../data/resumes-storage.json');
const DEFAULT_SAMPLE_FILE = path.join(__dirname, '../data/rosys-default.json');
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

function getStorage() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const defaultSample = JSON.parse(fs.readFileSync(DEFAULT_SAMPLE_FILE, 'utf-8'));
      // Pre-seed with sample candidates for host demonstration
      const initialList = [
        defaultSample,
        {
          ...defaultSample,
          id: "student-rahul-nair-2026",
          name: "Rahul Nair (ICU Nurse Specialist)",
          updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
          personalData: {
            ...defaultSample.personalData,
            lastName: "Nair",
            firstName: "Rahul",
            dateOfBirth: "15.04.1998",
            qualification: "B.Sc Nursing + Intensivkurs",
            yearsOfExperience: "3 Jahre 2 Monate",
            languageProficiency: "Deutsch B2 (TELC)",
            startDate: "Januar 2027",
            photoUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80"
          }
        },
        {
          ...defaultSample,
          id: "student-anju-mathew-2026",
          name: "Anju Mathew (OP-Pflege / Surgery)",
          updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
          personalData: {
            ...defaultSample.personalData,
            lastName: "Mathew",
            firstName: "Anju",
            dateOfBirth: "22.11.1999",
            qualification: "Bachelor of Science in Nursing",
            yearsOfExperience: "2 Jahre 4 Monate",
            languageProficiency: "Deutsch B2 (Goethe)",
            startDate: "Februar 2027",
            photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
          }
        }
      ];
      fs.writeFileSync(DATA_FILE, JSON.stringify(initialList, null, 2));
      return initialList;
    }
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading resumes storage:', err);
    return [];
  }
}

function saveStorage(resumes) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(resumes, null, 2));
  } catch (err) {
    console.error('Error saving resumes storage:', err);
  }
}

// GET all resumes (for Host Dashboard & student list)
router.get('/', (req, res) => {
  const list = getStorage();
  const summaryList = list.map(r => ({
    id: r.id,
    name: r.name || `${r.personalData?.lastName || 'Kandidat'}, ${r.personalData?.firstName || ''}`,
    lastName: r.personalData?.lastName || '',
    firstName: r.personalData?.firstName || '',
    role: r.personalData?.qualification || 'Pflegefachkraft',
    languageLevel: r.personalData?.languageProficiency || 'Deutsch B2',
    yearsOfExperience: r.personalData?.yearsOfExperience || '1-2 Jahre',
    startDate: r.personalData?.startDate || 'Flexibel',
    photoUrl: r.personalData?.photoUrl || '',
    updatedAt: r.updatedAt || new Date().toISOString(),
    template: r.template || 'rosys-official'
  }));
  res.json({ success: true, count: summaryList.length, resumes: summaryList });
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
  try {
    const defaultData = JSON.parse(fs.readFileSync(DEFAULT_SAMPLE_FILE, 'utf-8'));
    res.json({ success: true, resume: defaultData, isFallback: true });
  } catch (err) {
    res.status(404).json({ success: false, error: 'Resume not found' });
  }
});

// POST save or update resume (called when student creates/saves CV)
router.post('/', (req, res) => {
  const resume = req.body;
  if (!resume || !resume.personalData) {
    return res.status(400).json({ success: false, error: 'Invalid resume data' });
  }

  const list = getStorage();
  const id = resume.id || `student-${Date.now()}`;
  const now = new Date().toISOString();

  const preparedResume = {
    ...resume,
    id,
    updatedAt: now,
    submittedAt: resume.submittedAt || now,
    name: `${resume.personalData?.lastName || 'Kandidat'}, ${resume.personalData?.firstName || ''} (${resume.personalData?.qualification || 'Pflege'})`
  };

  const existingIndex = list.findIndex(r => r.id === id);
  if (existingIndex >= 0) {
    list[existingIndex] = preparedResume;
  } else {
    list.unshift(preparedResume);
  }

  saveStorage(list);
  res.json({ success: true, message: 'Student CV saved successfully', resume: preparedResume });
});

// DELETE resume (host action)
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const list = getStorage();
  const filtered = list.filter(r => r.id !== id);
  saveStorage(filtered);
  res.json({ success: true, message: 'Student CV removed' });
});

// GET direct download DOCX by student ID
router.get('/:id/export-docx', async (req, res) => {
  try {
    const { id } = req.params;
    const list = getStorage();
    const found = list.find(r => r.id === id);
    if (!found) {
      return res.status(404).json({ success: false, error: 'Student CV not found' });
    }

    const doc = createDocxFromResume(found);
    const buffer = await Packer.toBuffer(doc);

    const lastName = (found.personalData?.lastName || 'Student').replace(/[^a-zA-Z0-9_-]/g, '_');
    const fileName = `Lebenslauf_Rosys_${lastName}.docx`;

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.send(buffer);
  } catch (err) {
    console.error('Download DOCX error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
