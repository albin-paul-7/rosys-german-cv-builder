import React, { useState } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  Download, 
  Printer, 
  Maximize2, 
  Layers, 
  FileText,
  FileSpreadsheet,
  Loader2 
} from 'lucide-react';

import RosysOfficialTemplate from './templates/RosysOfficialTemplate';
import { downloadCvPdf, triggerPrint } from '../utils/pdfExport';
import { downloadCvDocx } from '../utils/docxExport';

export default function LivePreview({ resumeData, onUpdateTemplate }) {
  const [zoom, setZoom] = useState(0.85);
  const [activePage, setActivePage] = useState('all'); // 'all', 1, 2
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isExportingDocx, setIsExportingDocx] = useState(false);
  const [exportMessage, setExportMessage] = useState('');

  const currentTemplateId = resumeData.template || 'rosys-official';

  const handleZoom = (delta) => {
    setZoom((prev) => Math.min(Math.max(0.4, Number((prev + delta).toFixed(2))), 1.5));
  };

  const handleDownloadPdf = async () => {
    setIsExportingPdf(true);
    setExportMessage('Generating German Lebenslauf PDF...');
    try {
      await downloadCvPdf(resumeData);
      setExportMessage('PDF downloaded successfully!');
      setTimeout(() => setExportMessage(''), 2500);
    } catch (err) {
      console.error(err);
      setExportMessage('Exporting via browser print engine...');
      triggerPrint();
      setTimeout(() => setExportMessage(''), 2500);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleDownloadDocx = async () => {
    setIsExportingDocx(true);
    setExportMessage('Generating Microsoft Word (.docx)...');
    try {
      await downloadCvDocx(resumeData);
      setExportMessage('Word (.docx) downloaded successfully!');
      setTimeout(() => setExportMessage(''), 2500);
    } catch (err) {
      console.error(err);
      setExportMessage('DOCX generation failed');
      setTimeout(() => setExportMessage(''), 2500);
    } finally {
      setIsExportingDocx(false);
    }
  };

  const renderSelectedTemplate = (pageParam) => {
    return <RosysOfficialTemplate data={resumeData} page={pageParam} />;
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-200/80 overflow-hidden">
      {/* Top Controls Toolbar */}
      <div className="bg-white border-b border-slate-300 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        {/* Left: Official Template Indicator & Page Tabs */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 rounded-md border border-slate-300 text-xs font-bold text-slate-800">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b]"></span>
            <span>Rosy's Official Standard (Black & Orange)</span>
          </div>

          <div className="h-4 w-px bg-slate-300 hidden sm:block"></div>

          {/* Page Tabs */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-md border border-slate-200 text-xs font-medium">
            <button
              type="button"
              onClick={() => setActivePage('all')}
              className={`px-2.5 py-1 rounded transition ${
                activePage === 'all'
                  ? 'bg-white text-blue-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Both Pages
            </button>
            <button
              type="button"
              onClick={() => setActivePage(1)}
              className={`px-2.5 py-1 rounded transition ${
                activePage === 1
                  ? 'bg-white text-blue-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Page 1
            </button>
            <button
              type="button"
              onClick={() => setActivePage(2)}
              className={`px-2.5 py-1 rounded transition ${
                activePage === 2
                  ? 'bg-white text-blue-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Page 2
            </button>
          </div>
        </div>

        {/* Right: Zoom & Export Controls */}
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="flex items-center bg-slate-100 rounded-md border border-slate-200 text-xs px-1">
            <button
              type="button"
              onClick={() => handleZoom(-0.1)}
              className="p-1 text-slate-600 hover:text-slate-900"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1.5 text-[11px] font-mono text-slate-600">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={() => handleZoom(0.1)}
              className="p-1 text-slate-600 hover:text-slate-900"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setZoom(0.85)}
              className="p-1 text-slate-600 hover:text-slate-900 ml-0.5 border-l border-slate-200"
              title="Reset Zoom"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Print Button */}
          <button
            type="button"
            onClick={triggerPrint}
            className="hidden sm:flex items-center gap-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold px-2.5 py-1.5 rounded-md shadow-xs transition"
          >
            <Printer className="w-3.5 h-3.5" />
            Print
          </button>

          {/* Download Word (.docx) button */}
          <button
            type="button"
            onClick={handleDownloadDocx}
            disabled={isExportingDocx}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-xs transition"
          >
            {isExportingDocx ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <FileSpreadsheet className="w-3.5 h-3.5" />
            )}
            <span>Word (.docx)</span>
          </button>

          {/* Download PDF button */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isExportingPdf}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-xs transition"
          >
            {isExportingPdf ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            <span>PDF</span>
          </button>
        </div>
      </div>

      {/* Export status toast if any */}
      {exportMessage && (
        <div className="bg-slate-900 text-white text-xs py-1.5 px-4 text-center font-medium animate-pulse">
          {exportMessage}
        </div>
      )}

      {/* Preview Container */}
      <div className="flex-1 overflow-auto p-8 flex items-start justify-center">
        <div 
          id="cv-preview-container"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out'
          }}
          className="transition-all"
        >
          {renderSelectedTemplate(activePage)}
        </div>
      </div>
    </div>
  );
}
