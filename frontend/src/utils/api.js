const API_BASE = '/api';
const HOST_TOKEN_KEY = 'rosys_host_token';

export function getHostToken() {
  return sessionStorage.getItem(HOST_TOKEN_KEY) || '';
}

export function setHostToken(token) {
  sessionStorage.setItem(HOST_TOKEN_KEY, token);
}

export function clearHostToken() {
  sessionStorage.removeItem(HOST_TOKEN_KEY);
}

export function isHostAuthenticated() {
  return !!getHostToken();
}

export async function loginAsHost(pin) {
  const res = await fetch(`${API_BASE}/resumes/host/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pin })
  });

  const data = await res.json();
  if (res.ok && data.success && data.token) {
    setHostToken(data.token);
    return { success: true };
  } else {
    return { success: false, error: data.error || 'Invalid Host Passcode' };
  }
}

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

// Protected: Only host with token can fetch list of other students
export async function fetchSavedResumes() {
  const token = getHostToken();
  if (!token) {
    return { unauthorized: true, resumes: [] };
  }

  try {
    const res = await fetch(`${API_BASE}/resumes`, {
      headers: {
        'x-host-token': token
      }
    });

    if (res.status === 401) {
      clearHostToken();
      return { unauthorized: true, resumes: [] };
    }

    if (res.ok) {
      const data = await res.json();
      return { success: true, resumes: data.resumes || [] };
    }
  } catch (err) {
    console.warn('Error fetching saved resumes', err);
  }
  return { resumes: [] };
}

// Protected: Only host with token can fetch specific student
export async function fetchResumeById(id) {
  const token = getHostToken();
  try {
    const res = await fetch(`${API_BASE}/resumes/${id}`, {
      headers: {
        'x-host-token': token
      }
    });
    if (res.ok) {
      const data = await res.json();
      return data.resume;
    }
  } catch (err) {
    console.warn('Error loading resume', err);
  }
  return null;
}

// Export PDF for current resume (open for student's own active CV or host)
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
