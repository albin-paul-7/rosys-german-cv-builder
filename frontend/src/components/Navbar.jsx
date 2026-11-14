import React from 'react';
import { 
  FileText, 
  LayoutGrid, 
  Download, 
  Save, 
  RotateCcw, 
  Sparkles,
  ChevronDown
} from 'lucide-react';

export default function Navbar({ 
  currentView, 
  setCurrentView, 
  onLoadSample, 
  onSave, 
  isSaving,
  onReset 
}) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('editor')}>
            <img 
              src="/rosys-logo.png" 
              alt="Rosy's German School" 
              className="h-10 w-auto object-contain"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-slate-900 tracking-tight">
                  Rosy's CV Studio
                </span>
                <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  German Healthcare
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Official Lebenslauf Builder for German Hospital Placement
              </p>
            </div>
          </div>

          {/* Navigation Views */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              type="button"
              onClick={() => setCurrentView('templates')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold transition ${
                currentView === 'templates'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              Templates
            </button>
            <button
              type="button"
              onClick={() => setCurrentView('editor')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold transition ${
                currentView === 'editor'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Editor & Preview
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Quick Sample Loader */}
            <div className="relative group">
              <button
                type="button"
                className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-semibold px-3 py-1.5 rounded-md transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline">Pre-fill Sample</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              <div className="absolute right-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-slate-200 py-1 hidden group-hover:block group-focus-within:block z-50">
                <button
                  type="button"
                  onClick={() => onLoadSample('default')}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 text-slate-800 flex flex-col"
                >
                  <span className="font-bold text-slate-900">Gopika Jayaram (Like PDF)</span>
                  <span className="text-[11px] text-slate-500">Cardiology Nurse • 1.5 Yrs • Deutsch B2</span>
                </button>
                <button
                  type="button"
                  onClick={() => onLoadSample('icu')}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 text-slate-800 flex flex-col border-t border-slate-100"
                >
                  <span className="font-bold text-slate-900">Rahul Nair (ICU Specialist)</span>
                  <span className="text-[11px] text-slate-500">Critical Care • 3 Yrs • TELC B2</span>
                </button>
                <button
                  type="button"
                  onClick={onReset}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-rose-50 text-rose-600 flex items-center gap-1.5 border-t border-slate-100 font-semibold"
                >
                  <RotateCcw className="w-3 h-3" /> Blank Resume Form
                </button>
              </div>
            </div>

            {/* Save to Backend Button */}
            <button
              type="button"
              onClick={onSave}
              disabled={isSaving}
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3.5 py-1.5 rounded-md shadow-xs transition"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Saving...' : 'Save CV'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
