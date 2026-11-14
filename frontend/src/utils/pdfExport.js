import { exportPdfServer } from './api';

export async function downloadCvPdf(resumeData) {
  try {
    // Attempt backend high-res Chrome PDF generation first
    await exportPdfServer(resumeData);
    return { success: true, method: 'server' };
  } catch (err) {
    console.warn('Backend PDF export failed, falling back to browser print engine', err);
    // Fallback to browser print which prints the clean A4 element directly
    window.print();
    return { success: true, method: 'print-fallback' };
  }
}

export function triggerPrint() {
  window.print();
}
