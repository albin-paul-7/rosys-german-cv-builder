# Rosy's CV Studio — German Healthcare Lebenslauf Builder

A full-stack web application modeled after modern resume builders (like [resume.io](https://resume.io/app/create-resume/templates)), purpose-built for **Rosy's German School** (Euronav Overseas & Educational Consultants Pvt. Ltd., Edappally, Kochi) to generate official, German-language healthcare CVs (*Lebenslauf*) for international nurses and healthcare professionals placed in Germany.

---

## 🌟 Key Features

### 1. English Website Interface & Controls
- Modeled after **Resume.io**: Clean navigation, template gallery, live dual-page A4 preview, zoom controls, and section-by-section form editors.
- English UI labels and helpful tooltips for coordinators and applicants, with live German terminology output for hospital hiring managers (*Pflegedirektion*).

### 2. German Lebenslauf Content & Structure
- Conforms directly to the **Care Gates GmbH sample format** provided, adapted and elevated with **Rosy's German School** branding.
- **Top Header:** Bold "Lebenslauf" navy banner + official Rosy's German School emblem and corporate title.
- **Persönliche Daten:** Two-column candidate profile (Nachname, Vorname, Geburtstag/-ort, Herkunftsland, Ausbildung, Berufserfahrung, Sprachkenntnisse, Arbeitsbeginn) with applicant photograph.
- **Einschätzung Rosy's German School:** Formal institutional assessment paragraph breakdown (Clinical background, apparatus mastery, soft skills, B2 German proficiency, and hospital onboarding recommendations).
  - *Includes 1-Click Smart Presets* for Cardiology (*Kardiologie*), Intensive Care (*ITS / ICU*), and Surgery (*OP-Pflege*).
- **Berufliche Erfahrung:** Chronological employment entries with clinical duties (*Aufgaben*).
- **Ausbildung:** Higher education (B.Sc. Nursing), secondary, and school education.
- **Kenntnisse und Kompetenzen:**
  - *Sprachkenntnisse* (Deutsch B2, Englisch B2, Malayalam, Tamil, etc.)
  - *Soziale Kompetenzen* (Führungsverantwortung, Empathie, etc.)
  - *EDV / IT-Kenntnisse* (Hospital Information Systems / KIS)
  - *Am Arbeitsplatz verwendete Geräte* (EKG, Pulsoxymeter, Defibrillator, BiPAP, Infusomat, Perfusor, etc.)
- **Official Footer on Every Page:**
  `Rosy's German School, 1st Floor, Saroja Complex, Bank Junction, Edappally, Kochi, Kerala – 682024 | +91 8921438879 | rosysgermanschool@gmail.com | Seite 1/2`

### 3. Template Gallery (`/templates`)
- **Rosy's Official Standard:** Exact 1:1 match to the attached Care Gates PDF, branded for Rosy's German School.
- **Rosy's Modern Sapphire:** Contemporary layout featuring European CEFR B2 badges and an equipment grid.
- **Rosy's Clinical Executive:** Specialized deep-wine layout highlighting intensive care and acute medical skills.
- **Rosy's Clean Hospital ATS:** High-contrast minimalist format favored by German university hospital HR systems.

### 4. Real-Time A4 Live Preview & PDF Engine
- Interactive scale & zoom (50%, 75%, 100%, 125%, Fit to screen).
- Page 1, Page 2, or Continuous dual-page views.
- **Server-Side PDF Generation:** Built with Puppeteer and native Google Chrome for pixel-perfect A4 documents.
- **Client-Side Print Fallback:** Standard `@media print` rules for browser printing with exact margins.

### 5. Backend REST API
- `GET /api/health` — Service health and metadata
- `GET /api/templates` — Metadata for available templates
- `GET /api/resumes` — List saved candidate resumes
- `POST /api/resumes` — Save/update resume
- `GET /api/resumes/:id` — Load resume by ID
- `GET /api/resumes/default/sample` — Fetch default prefilled Gopika Jayaram sample
- `POST /api/export-pdf` — Generates a downloadable 2-page PDF

---

## 🚀 Running the Application

### Option A: Complete App (Production mode)
```bash
cd "rosys-cv-builder/backend"
node server.js
```
Open your browser at: **`http://localhost:5001`**

### Option B: Development Mode (Vite Hot-Reload)
```bash
# Terminal 1: Backend
cd "rosys-cv-builder/backend"
node server.js

# Terminal 2: Frontend
cd "rosys-cv-builder/frontend"
npm run dev
```
Open your browser at: **`http://localhost:3000`**

---

## 🏛️ Rosy's German School Official Details
- **Institution:** Rosy's German School
- **Parent Entity:** Euronav Overseas & Educational Consultants Pvt. Ltd.
- **Address:** 1st Floor, Saroja Complex, Bank Junction (Near Metro Pillar No. 445), Edappally, Ernakulam, Kochi, Kerala, India – 682024
- **Hotline:** +91 8921438879 / +91 8075192445
- **Email:** rosysgermanschool@gmail.com
- **Website:** www.rosysgermanschool.com
- **Accreditation:** NORKA-ROOTS Satellite Centre Agency (SCA) Partner
