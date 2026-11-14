const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const TEMPLATES_FILE = path.join(__dirname, '../data/templates.json');

router.get('/', (req, res) => {
  try {
    const templates = JSON.parse(fs.readFileSync(TEMPLATES_FILE, 'utf-8'));
    res.json({ success: true, templates });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to read templates' });
  }
});

router.get('/:id', (req, res) => {
  try {
    const templates = JSON.parse(fs.readFileSync(TEMPLATES_FILE, 'utf-8'));
    const template = templates.find(t => t.id === req.params.id);
    if (!template) {
      return res.status(404).json({ success: false, error: 'Template not found' });
    }
    res.json({ success: true, template });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to read template' });
  }
});

module.exports = router;
