const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const TERMS_FILE = path.join(__dirname, '../data/german-terms.json');
const DEFAULT_SAMPLE_FILE = path.join(__dirname, '../data/rosys-default.json');

router.get('/terms', (req, res) => {
  try {
    const terms = JSON.parse(fs.readFileSync(TERMS_FILE, 'utf-8'));
    res.json({ success: true, ...terms });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to read terms' });
  }
});

router.get('/institution', (req, res) => {
  try {
    const sample = JSON.parse(fs.readFileSync(DEFAULT_SAMPLE_FILE, 'utf-8'));
    res.json({
      success: true,
      institution: sample.institution
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to read institution' });
  }
});

module.exports = router;
