import React from 'react';
import { TEMPLATES } from '../data/templatesConfig';
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function TemplateGallery({ selectedTemplate, onSelectTemplate, onContinueToEditor }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold mb-3">
          <ShieldCheck className="w-4 h-4 text-blue-700" />
          Official Rosy's German School Career Templates
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
          German Healthcare CV Templates (Lebenslauf)
        </h1>
        <p className="mt-3 text-base text-slate-600 leading-relaxed">
          Select an accredited template configured to meet the recruitment standards of German hospitals, care facilities, and medical recognition authorities (<em className="font-semibold text-slate-700">Anerkennungsverfahren</em>).
        </p>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {TEMPLATES.map((tmpl) => {
          const isSelected = selectedTemplate === tmpl.id;
          return (
            <div
              key={tmpl.id}
              className={`bg-white rounded-xl overflow-hidden border-2 transition-all duration-200 flex flex-col justify-between hover:shadow-lg ${
                isSelected
                  ? 'border-blue-600 ring-4 ring-blue-100 shadow-md'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Template Thumbnail Representation */}
              <div className="p-4 bg-slate-50 border-b border-slate-100 relative group cursor-pointer" onClick={() => onSelectTemplate(tmpl.id)}>
                <div className="aspect-[210/297] bg-white rounded shadow-sm border border-slate-200 p-3 flex flex-col justify-between overflow-hidden relative">
                  {/* Mock A4 Page Header */}
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <div 
                      className="text-[8px] font-bold text-white px-2 py-0.5"
                      style={{ backgroundColor: tmpl.accentColor }}
                    >
                      Lebenslauf
                    </div>
                    <div className="text-[7px] font-bold text-slate-700 uppercase">
                      Rosy's German School
                    </div>
                  </div>

                  {/* Mock Content Lines */}
                  <div className="space-y-1.5 my-2">
                    <div className="flex gap-2">
                      <div className="w-2/3 space-y-1">
                        <div className="h-1.5 bg-slate-300 rounded w-full"></div>
                        <div className="h-1.5 bg-slate-200 rounded w-5/6"></div>
                        <div className="h-1.5 bg-slate-200 rounded w-4/6"></div>
                      </div>
                      <div className="w-1/3 h-10 bg-slate-200 rounded border border-slate-300 flex items-center justify-center text-[6px] text-slate-400">
                        Foto
                      </div>
                    </div>
                    <div className="h-2 rounded w-1/3" style={{ backgroundColor: tmpl.accentColor }}></div>
                    <div className="h-1 bg-slate-200 rounded w-full"></div>
                    <div className="h-1 bg-slate-200 rounded w-full"></div>
                    <div className="h-1 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-2 rounded w-1/3 mt-2" style={{ backgroundColor: tmpl.accentColor }}></div>
                    <div className="h-1 bg-slate-200 rounded w-full"></div>
                    <div className="h-1 bg-slate-200 rounded w-4/5"></div>
                  </div>

                  {/* Mock Footer */}
                  <div className="pt-1.5 border-t border-slate-100 text-[6px] text-slate-400 flex justify-between">
                    <span>Rosy's German School • Edappally, Kochi</span>
                    <span>Seite 1/2</span>
                  </div>
                </div>

                {/* Popular / Official Badge */}
                {tmpl.popular && (
                  <div className="absolute top-6 right-6 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                    Official Format
                  </div>
                )}
              </div>

              {/* Template Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-base text-slate-900">{tmpl.name}</h3>
                  </div>
                  <span className="inline-block text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded mb-2">
                    {tmpl.badge}
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {tmpl.description}
                  </p>

                  <div className="space-y-1.5 mb-5 text-[11.5px] text-slate-600">
                    {tmpl.tags && tmpl.tags.map((tag, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectTemplate(tmpl.id);
                      onContinueToEditor();
                    }}
                    className={`w-full py-2.5 px-4 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <span>{isSelected ? 'Active & Edit' : 'Use Template'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
