const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const { Packer } = require('docx');
const { createDocxFromResume } = require('./docxGenerator');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const LOGO_PATH = path.join(__dirname, '../public/rosys-logo.png');

function getLogoBase64() {
  try {
    if (fs.existsSync(LOGO_PATH)) {
      const buffer = fs.readFileSync(LOGO_PATH);
      return `data:image/png;base64,${buffer.toString('base64')}`;
    }
  } catch (e) {
    console.error('Error reading logo:', e);
  }
  return '';
}

function generateHtmlFromResume(data) {
  const p = data.personalData || {};
  const inst = data.institution || {};
  const assessment = data.assessment || {};
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || {};
  const logoSrc = getLogoBase64() || '/rosys-logo.png';
  const themeColor = data.themeColor || '#18181b';

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>Lebenslauf - ${p.lastName || ''}, ${p.firstName || ''}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 0;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #1f2937;
      background: #ffffff;
      font-size: 13.5px;
      line-height: 1.45;
    }
    .cv-page {
      width: 210mm;
      height: 297mm;
      padding: 0;
      position: relative;
      background: #ffffff;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
    }
    .cv-page:last-child {
      page-break-after: avoid;
    }
    
    /* Top Header Bar */
    .top-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 26px 48px 12px 48px;
    }
    .lebenslauf-badge-wrap {
      display: inline-flex;
      flex-direction: column;
    }
    .lebenslauf-badge {
      background-color: ${themeColor};
      color: #ffffff;
      padding: 12px 36px;
      font-size: 20px;
      font-weight: 800;
      letter-spacing: 0.8px;
      display: inline-block;
      text-transform: uppercase;
    }
    .lebenslauf-flag-stripe {
      display: flex;
      height: 4px;
      width: 100%;
    }
    .flag-black { background: #18181b; width: 33.33%; }
    .flag-red { background: #dc2626; width: 33.33%; }
    .flag-gold { background: #f59e0b; width: 33.34%; }

    .inst-logo-container {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .inst-logo-img {
      height: 58px;
      max-width: 220px;
      object-fit: contain;
    }

    /* Page Content */
    .page-content {
      padding: 6px 48px 24px 48px;
      flex-grow: 1;
    }

    /* Section Header */
    .section-title-wrap {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-top: 16px;
      margin-bottom: 12px;
    }
    .section-bar {
      height: 6px;
      width: 135px;
      background-color: ${themeColor};
      position: relative;
    }
    .section-bar::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      width: 25px;
      height: 6px;
      background-color: #dc2626;
    }
    .section-title {
      font-size: 18.5px;
      font-weight: 700;
      color: #18181b;
      margin: 0;
      letter-spacing: -0.2px;
    }

    /* Personal Data Section Grid */
    .personal-data-grid {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-top: 6px;
      margin-bottom: 16px;
    }
    .personal-data-table {
      flex: 1;
      border-collapse: collapse;
    }
    .personal-data-table tr td {
      padding: 4px 0;
      vertical-align: top;
      font-size: 13.5px;
    }
    .personal-data-table .label-col {
      width: 190px;
      font-weight: 700;
      color: #111827;
    }
    .personal-data-table .value-col {
      color: #1f2937;
    }
    .candidate-photo-wrap {
      margin-left: 24px;
      width: 125px;
      height: 155px;
      border: 1px solid #d1d5db;
      background: #f9fafb;
      overflow: hidden;
      flex-shrink: 0;
    }
    .candidate-photo-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* Assessment Section */
    .assessment-grid {
      display: flex;
      align-items: flex-start;
      margin-top: 14px;
      margin-bottom: 16px;
    }
    .assessment-label {
      width: 190px;
      font-weight: 700;
      color: #111827;
      flex-shrink: 0;
      padding-top: 2px;
    }
    .assessment-text {
      flex: 1;
      font-size: 13px;
      line-height: 1.48;
      color: #374151;
    }
    .assessment-text p {
      margin: 0 0 10px 0;
      text-align: justify;
    }

    /* Experience & Education Timelines */
    .timeline-item {
      display: flex;
      margin-bottom: 12px;
      font-size: 13.5px;
    }
    .timeline-date {
      width: 190px;
      font-weight: 700;
      color: #111827;
      flex-shrink: 0;
    }
    .timeline-detail {
      flex: 1;
    }
    .timeline-role {
      font-weight: 700;
      color: #dc2626;
      margin-bottom: 2px;
    }
    .timeline-facility {
      color: #4b5563;
      margin-bottom: 4px;
    }
    .task-title {
      font-weight: 600;
      color: #4b5563;
      margin-top: 4px;
      margin-bottom: 2px;
    }
    .task-list {
      margin: 0;
      padding-left: 18px;
    }
    .task-list li {
      margin-bottom: 3px;
      color: #374151;
      line-height: 1.4;
    }

    /* Skills Grid */
    .skills-grid {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .skills-row {
      display: flex;
      font-size: 13.5px;
    }
    .skills-label {
      width: 190px;
      font-weight: 700;
      color: #111827;
      flex-shrink: 0;
    }
    .skills-content {
      flex: 1;
      color: #374151;
    }
    .skills-content div {
      margin-bottom: 2px;
    }

    /* Footer */
    .cv-footer {
      border-top: 1px solid #e5e7eb;
      padding: 12px 48px 16px 48px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      color: #4b5563;
      font-weight: 500;
    }
    .cv-footer-left {
      max-width: 85%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .cv-footer-right {
      font-weight: 700;
      color: #111827;
      white-space: nowrap;
    }
  </style>
</head>
<body>

  <!-- ==================== PAGE 1 ==================== -->
  <div class="cv-page">
    <div>
      <div class="top-header">
        <div class="lebenslauf-badge-wrap">
          <div class="lebenslauf-badge">Lebenslauf</div>
          <div class="lebenslauf-flag-stripe">
            <div class="flag-black"></div>
            <div class="flag-red"></div>
            <div class="flag-gold"></div>
          </div>
        </div>
        <div class="inst-logo-container">
          <img src="${logoSrc}" alt="${inst.name || 'Rosy\'s German School'}" class="inst-logo-img" />
        </div>
      </div>

      <div class="page-content">
        <!-- Section: Persönliche Daten -->
        <div class="section-title-wrap">
          <div class="section-bar"></div>
          <h2 class="section-title">Persönliche Daten</h2>
        </div>

        <div class="personal-data-grid">
          <table class="personal-data-table">
            <tr>
              <td class="label-col">Nachname, Vorname</td>
              <td class="value-col" style="font-weight: 600;">${p.lastName || ''}, ${p.firstName || ''}</td>
            </tr>
            <tr>
              <td class="label-col">Geburtstag/-ort</td>
              <td class="value-col">${p.dateOfBirth || ''}${p.placeOfBirth ? ', ' + p.placeOfBirth : ''}</td>
            </tr>
            <tr>
              <td class="label-col">Herkunftsland</td>
              <td class="value-col">${p.countryOfOrigin || ''}</td>
            </tr>
            <tr>
              <td class="label-col">Ausbildung</td>
              <td class="value-col">${p.qualification || ''}</td>
            </tr>
            <tr>
              <td class="label-col">Berufserfahrung in Jahren</td>
              <td class="value-col">${p.yearsOfExperience || ''}</td>
            </tr>
            <tr>
              <td class="label-col">Sprachkenntnisse</td>
              <td class="value-col" style="font-weight: 700; color: #dc2626;">${p.languageProficiency || ''}</td>
            </tr>
            <tr>
              <td class="label-col">Arbeitsbeginn</td>
              <td class="value-col">${p.startDate || ''}</td>
            </tr>
          </table>

          <div class="candidate-photo-wrap">
            ${p.photoUrl ? `<img src="${p.photoUrl}" alt="${p.firstName || ''} ${p.lastName || ''}" />` : '<div style="display:flex;height:100%;align-items:center;justify-content:center;color:#9ca3af;font-size:12px;">Foto</div>'}
          </div>
        </div>

        <!-- Section: Einschätzung -->
        <div class="assessment-grid">
          <div class="assessment-label">${assessment.title || 'Einschätzung Rosy\'s German School'}</div>
          <div class="assessment-text">
            ${(assessment.paragraphs || []).map(para => `<p>${para}</p>`).join('')}
          </div>
        </div>

        <!-- Section: Berufliche Erfahrung (Teil 1) -->
        <div class="section-title-wrap">
          <div class="section-bar"></div>
          <h2 class="section-title">Berufliche Erfahrung</h2>
        </div>

        ${experience.slice(0, 1).map(exp => `
          <div class="timeline-item">
            <div class="timeline-date">${exp.period || ''}</div>
            <div class="timeline-detail">
              <div class="timeline-role">${exp.role || ''}</div>
              <div class="timeline-facility">${exp.facility || ''}</div>
              ${exp.tasks && exp.tasks.length > 0 ? `
                <div class="task-title">Aufgaben:</div>
                <ul class="task-list">
                  ${exp.tasks.slice(0, 2).map(t => `<li>${t}</li>`).join('')}
                </ul>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Page 1 Footer -->
    <div class="cv-footer">
      <div class="cv-footer-left">
        ${inst.name || 'Rosy\'s German School'}, ${inst.address || 'Edappally, Kochi'} | ${inst.phone || '+91 8921438879'} | ${inst.email || 'rosysgermanschool@gmail.com'}
      </div>
      <div class="cv-footer-right">Seite 1/2</div>
    </div>
  </div>

  <!-- ==================== PAGE 2 ==================== -->
  <div class="cv-page">
    <div>
      <div class="top-header">
        <div class="lebenslauf-badge-wrap">
          <div class="lebenslauf-badge">Lebenslauf</div>
          <div class="lebenslauf-flag-stripe">
            <div class="flag-black"></div>
            <div class="flag-red"></div>
            <div class="flag-gold"></div>
          </div>
        </div>
        <div class="inst-logo-container">
          <img src="${logoSrc}" alt="${inst.name || 'Rosy\'s German School'}" class="inst-logo-img" />
        </div>
      </div>

      <div class="page-content">
        <!-- Fortsetzung Berufliche Erfahrung (Aufgaben) -->
        ${experience.length > 0 && experience[0].tasks && experience[0].tasks.length > 2 ? `
          <div style="margin-left: 190px; margin-bottom: 24px;">
            <ul class="task-list">
              ${experience[0].tasks.slice(2).map(t => `<li>${t}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        <!-- Section: Ausbildung -->
        <div class="section-title-wrap">
          <div class="section-bar"></div>
          <h2 class="section-title">Ausbildung</h2>
        </div>

        ${education.map(edu => `
          <div class="timeline-item">
            <div class="timeline-date">${edu.period || ''}</div>
            <div class="timeline-detail">
              <div class="timeline-role" style="color: #111827;">${edu.degree || ''}</div>
              <div class="timeline-facility">${edu.institution || ''}</div>
            </div>
          </div>
        `).join('')}

        <!-- Section: Kenntnisse und Kompetenzen -->
        <div class="section-title-wrap" style="margin-top: 24px;">
          <div class="section-bar"></div>
          <h2 class="section-title">Kenntnisse und Kompetenzen</h2>
        </div>

        <div class="skills-grid">
          <!-- Sprachkenntnisse -->
          <div class="skills-row">
            <div class="skills-label">Sprachkenntnisse</div>
            <div class="skills-content">
              ${(skills.languages || []).map(l => `<div><span style="font-weight:600;">${l.language}</span> – ${l.level}</div>`).join('')}
            </div>
          </div>

          <!-- Soziale Kompetenzen -->
          <div class="skills-row">
            <div class="skills-label">Soziale Kompetenzen</div>
            <div class="skills-content">
              ${(skills.socialSkills || []).map(s => `<div>${s}</div>`).join('')}
            </div>
          </div>

          <!-- EDV / IT-Kenntnisse -->
          <div class="skills-row">
            <div class="skills-label">EDV / IT-Kenntnisse</div>
            <div class="skills-content">
              ${(skills.itSkills || []).map(it => `<div>${it}</div>`).join('')}
            </div>
          </div>

          <!-- Am Arbeitsplatz verwendete Geräte -->
          <div class="skills-row">
            <div class="skills-label">Am Arbeitsplatz verwendete Geräte</div>
            <div class="skills-content">
              ${(skills.equipment || []).map(eq => `<div>${eq}</div>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Page 2 Footer -->
    <div class="cv-footer">
      <div class="cv-footer-left">
        ${inst.name || 'Rosy\'s German School'}, ${inst.address || 'Edappally, Kochi'} | ${inst.phone || '+91 8921438879'} | ${inst.email || 'rosysgermanschool@gmail.com'}
      </div>
      <div class="cv-footer-right">Seite 2/2</div>
    </div>
  </div>

</body>
</html>`;
}

// POST /api/export-pdf
router.post('/export-pdf', async (req, res) => {
  let browser = null;
  try {
    const resumeData = req.body;
    if (!resumeData) {
      return res.status(400).json({ success: false, error: 'Resume data required' });
    }

    const htmlContent = generateHtmlFromResume(resumeData);

    if (!fs.existsSync(CHROME_PATH)) {
      return res.status(500).json({
        success: false,
        error: `Chrome executable not found at ${CHROME_PATH}`
      });
    }

    browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
      preferCSSPageSize: true
    });

    const lastName = (resumeData.personalData?.lastName || 'Kandidat').replace(/[^a-zA-Z0-9_-]/g, '_');
    const fileName = `Lebenslauf_Rosys_${lastName}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    res.send(pdfBuffer);
  } catch (error) {
    console.error('PDF Generation Error:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to generate PDF' });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});

// POST /api/export-docx
router.post('/export-docx', async (req, res) => {
  try {
    const resumeData = req.body;
    if (!resumeData) {
      return res.status(400).json({ success: false, error: 'Resume data required' });
    }

    const doc = createDocxFromResume(resumeData);
    const buffer = await Packer.toBuffer(doc);

    const lastName = (resumeData.personalData?.lastName || 'Kandidat').replace(/[^a-zA-Z0-9_-]/g, '_');
    const fileName = `Lebenslauf_Rosys_${lastName}.docx`;

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Length', buffer.length);
    res.send(buffer);
  } catch (error) {
    console.error('DOCX Generation Error:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to generate Word document' });
  }
});

module.exports = router;
