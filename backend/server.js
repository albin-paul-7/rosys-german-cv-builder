const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const resumesRouter = require('./routes/resumes');
const templatesRouter = require('./routes/templates');
const presetsRouter = require('./routes/presets');
const exportRouter = require('./routes/export');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static files (public and built frontend if available)
app.use(express.static(path.join(__dirname, 'public')));
const frontendDistPath = path.join(__dirname, '../frontend/dist');
if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    institution: "Rosy's German School & Recruitment Services",
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/resumes', resumesRouter);
app.use('/api/templates', templatesRouter);
app.use('/api/presets', presetsRouter);
app.use('/api', exportRouter);

// Fallback to frontend index.html for SPA client routing
if (fs.existsSync(frontendDistPath)) {
  app.use((req, res, next) => {
    if (!req.path.startsWith('/api')) {
      return res.sendFile(path.join(frontendDistPath, 'index.html'));
    }
    next();
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` Rosy's German CV Builder Backend Server Running`);
  console.log(` Port: http://localhost:${PORT}`);
  console.log(` Health: http://localhost:${PORT}/api/health`);
  console.log(`====================================================`);
});
