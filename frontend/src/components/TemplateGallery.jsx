import React from 'react';
import { TEMPLATES } from '../data/templatesConfig';
import { CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Award } from 'lucide-react';

export default function TemplateGallery({ selectedTemplate, onSelectTemplate, onContinueToEditor }) {
  const tmpl = TEMPLATES[0] || {
    id: "rosys-official",
    name: "Rosy's Official Standard",
    badge: "Official & Mandatory Format",
    description: "The authorized institutional German Lebenslauf format featuring Rosy's German School branding (German Linguist Since 1971), signature black & orange Lebenslauf header banner with German flag tricolor accent, and verified Edappally, Kochi footer.",
    tags: [
      "Official Rosy's German School Emblem & Branding",
      "Signature Black & Orange/Tricolor Lebenslauf Header",
      "German Healthcare Standard (Care-Gates GmbH Matched)",
      "Structured 2-Page Flow with Institutional Assessment",
      "Verified Edappally, Kochi Multi-Page Footer"
    ]
  };

  const isSelected = selectedTemplate === tmpl.id || true;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3 border border-amber-200">
          <ShieldCheck className="w-4 h-4 text-amber-700" />
          Authorized Institutional Format
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
          Rosy's German Healthcare CV Template
        </h1>
        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
          The standardized and accredited <em className="font-semibold text-slate-800">Lebenslauf</em> required for German hospital nursing recruitment and official recognition (<em className="font-semibold text-slate-800">Anerkennungsverfahren</em>).
        </p>
      </div>

      {/* Featured Single Template Card */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border-2 border-slate-900 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Visual Mockup of Black & Orange Template */}
          <div className="p-6 bg-slate-50 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-200">
            <div className="w-full max-w-[260px] aspect-[210/297] bg-white rounded-lg shadow-md border border-slate-200 p-4 flex flex-col justify-between overflow-hidden relative">
              
              {/* Top Banner: Black & Orange Header */}
              <div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <div className="flex flex-col shadow-xs">
                    <div className="text-[9px] font-black text-white px-3 py-1 bg-[#18181b] tracking-wider uppercase">
                      Lebenslauf
                    </div>
                    {/* Tricolor stripe (Black, Red, Orange/Gold) */}
                    <div className="flex h-[3px] w-full">
                      <div className="w-1/3 bg-[#18181b]"></div>
                      <div className="w-1/3 bg-[#dc2626]"></div>
                      <div className="w-1/3 bg-[#f59e0b]"></div>
                    </div>
                  </div>
                  
                  <img 
                    src="/rosys-logo.png" 
                    alt="Rosy's Logo" 
                    className="h-7 max-w-[90px] object-contain"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>

                {/* Candidate Info Mock */}
                <div className="mt-3 flex gap-2">
                  <div className="w-2/3 space-y-1">
                    <div className="h-2 bg-slate-800 rounded w-4/5"></div>
                    <div className="h-1 bg-slate-300 rounded w-full"></div>
                    <div className="h-1 bg-slate-200 rounded w-5/6"></div>
                    <div className="h-1 bg-slate-200 rounded w-3/4"></div>
                  </div>
                  <div className="w-1/3 h-12 bg-slate-100 rounded border border-slate-300 flex items-center justify-center text-[7px] font-bold text-slate-400">
                    Passfoto
                  </div>
                </div>

                {/* Section Header: Black & Orange stripe */}
                <div className="mt-3 mb-1">
                  <div className="flex items-center gap-1">
                    <div className="h-[3px] w-12 bg-[#18181b]"></div>
                    <div className="h-[3px] w-3 bg-[#dc2626]"></div>
                    <div className="h-[3px] w-3 bg-[#f59e0b]"></div>
                    <span className="text-[7px] font-bold text-slate-700">Persönliche Daten</span>
                  </div>
                  <div className="space-y-1 mt-1.5">
                    <div className="h-1 bg-slate-200 rounded w-full"></div>
                    <div className="h-1 bg-slate-100 rounded w-4/5"></div>
                  </div>
                </div>

                {/* Assessment Block */}
                <div className="mt-2.5">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="h-[3px] w-12 bg-[#18181b]"></div>
                    <div className="h-[3px] w-3 bg-[#dc2626]"></div>
                    <div className="h-[3px] w-3 bg-[#f59e0b]"></div>
                    <span className="text-[6.5px] font-bold text-slate-700">Einschätzung Rosy's</span>
                  </div>
                  <div className="p-1.5 bg-amber-50/70 border border-amber-200/80 rounded space-y-0.5">
                    <div className="h-1 bg-amber-200 rounded w-full"></div>
                    <div className="h-1 bg-amber-100 rounded w-5/6"></div>
                  </div>
                </div>
              </div>

              {/* Verified Footer */}
              <div className="pt-2 border-t border-slate-100 text-[6px] text-slate-500 flex justify-between items-center">
                <span>Rosy's German School • Edappally</span>
                <span className="font-bold text-slate-800">Seite 1/2</span>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-[#18181b] border border-slate-300"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]"></span>
              <span className="ml-1 text-[11px] text-slate-600">Black & Orange German Flag Scheme</span>
            </div>
          </div>

          {/* Right Column: Template Info & CTA */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                  <Award className="w-3.5 h-3.5 text-amber-700" />
                  Official Template
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Active
                </span>
              </div>

              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                {tmpl.name}
              </h2>
              <p className="text-xs text-slate-500 font-semibold mt-0.5 mb-3">
                Signature Black & Orange Lebenslauf
              </p>

              <p className="text-xs text-slate-600 leading-relaxed mb-5">
                {tmpl.description}
              </p>

              <div className="border-t border-slate-100 pt-4 mb-6">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                  Template Specifications
                </h3>
                <div className="space-y-2 text-xs text-slate-600">
                  {tmpl.tags && tmpl.tags.map((tag, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className="font-medium">{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  onSelectTemplate(tmpl.id);
                  onContinueToEditor();
                }}
                className="w-full py-3.5 px-6 rounded-xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Continue to CV Editor</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-[11px] text-center text-slate-400 mt-2 font-medium">
                This is the sole authorized template for all student applications
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
