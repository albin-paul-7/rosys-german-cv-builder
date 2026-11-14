const API_BASE = '/api';

export async function fetchTemplates() {
  try {
    const res = await fetch(`${API_BASE}/templates`);
    if (res.ok) {
      const data = await res.json();
      return data.templates;
    }
  } catch (err) {
    console.warn('Backend templates fetch error, using defaults', err);
  }
  return null;
}

export async function fetchDefaultSample() {
  try {
    const res = await fetch(`${API_BASE}/resumes/default/sample`);
    if (res.ok) {
      const data = await res.json();
      return data.resume;
    }
  } catch (err) {
    console.warn('Backend sample fetch error, using local sample', err);
  }
  return null;
}

export async function saveResume(resume) {
  try {
    const res = await fetch(`${API_BASE}/resumes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resume)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error('Error saving resume to server:', err);
  }
  return null;
}

export async function fetchSavedResumes() {
  try {
    const res = await fetch(`${API_BASE}/resumes`);
    if (res.ok) {
      const data = await res.json();
      return data.resumes;
    }
  } catch (err) {
    console.warn('Error fetching saved resumes', err);
  }
  return [];
}

export async function fetchResumeById(id) {
  try {
    const res = await fetch(`${API_BASE}/resumes/${id}`);
    if (res.ok) {
      const data = await res.json();
      return data.resume;
    }
  } catch (err) {
    console.warn('Error loading resume', err);
  }
  return null;
}

export async function exportPdfServer(resumeData) {
  const res = await fetch(`${API_BASE}/export-pdf`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(resumeData)
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`PDF Generation failed: ${errorText}`);
  }

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const lastName = (resumeData.personalData?.lastName || 'Kandidat').replace(/[^a-zA-Z0-9_-]/g, '_');
  a.download = `Lebenslauf_Rosys_${lastName}.pdf`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  a.remove();
}
