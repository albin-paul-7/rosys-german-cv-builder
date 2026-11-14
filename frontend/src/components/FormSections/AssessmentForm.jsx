import React from 'react';
import { Sparkles, Plus, Trash2, BookOpen } from 'lucide-react';

export default function AssessmentForm({ assessment, personalData, onChange }) {
  const candidateName = personalData.lastName 
    ? `Frau ${personalData.lastName}` 
    : 'Die Kandidatin';

  const presets = [
    {
      label: 'Kardiologie (Cardiology Standard - Like Sample)',
      paragraphs: [
        `${candidateName} verfügt über fundierte Berufserfahrung als Pflegefachfrau im kardiologischen Bereich.`,
        `In ihrer bisherigen Tätigkeit lag ihr Schwerpunkt auf der Einschätzung und Beurteilung kardiologischer Patientinnen und Patienten, der pflegerischen Betreuung und Überwachung sowie der Verabreichung ärztlich verordneter Herzmedikamente. Darüber hinaus verfügt sie über praktische Erfahrung im Umgang mit für die kardiologische und akutmedizinische Versorgung relevanten Geräten, darunter EKG-Gerät, Herzmonitor, Pulsoxymeter, Defibrillator, Absauggerät sowie Spritzen- und Infusionspumpen. Auch im Umgang mit Notfallausrüstung wie Crash Cart und Ambu-Beutel sowie mit einem BiPAP-Gerät bringt sie praktische Erfahrung mit. Ihre fachliche Qualifikation wird durch einen Bachelor of Science in Nursing ergänzt.`,
        `Zu ihren persönlichen Kompetenzen zählen unter anderem Verantwortungsbewusstsein, Problemlösungskompetenz, aktives Zuhören, Beobachtungsgabe, Empathie und Teamfähigkeit. Sprachlich verfügt sie über Deutschkenntnisse auf B2-Niveau sowie Englischkenntnisse auf B2-Niveau.`,
        `Aus Sicht von Rosy's German School ist ihr Profil aufgrund ihrer bisherigen Tätigkeit insbesondere für den kardiologischen und akutmedizinischen Bereich hochinteressant. Für einen erfolgreichen Einstieg wird eine strukturierte Einarbeitung in die hiesigen pflegerischen Abläufe, Standards und Strukturen empfohlen.`
      ]
    },
    {
      label: 'Intensivstation (ICU / Critical Care)',
      paragraphs: [
        `${candidateName} bringt mehrjährige spezialisierte Erfahrung auf einer interdisziplinären Intensivstation mit.`,
        `Sie betreut fachgerecht beatmete sowie kreislaufinstabile Intensivpatienten. Ihr Aufgabenspektrum umfasst die kontinuierliche Vitaldatenüberwachung, die Verabreichung von Katecholaminen und Notfallmedikamenten über Perfusoren sowie die Assistenz bei Notfallinterventionen. Sie beherrscht den Umgang mit invasiven und nicht-invasiven Beatmungsgeräten, Defibrillatoren und Blutgasanalyse-Systemen.`,
        `Sie zeichnet sich durch herausragende Belastbarkeit in Notfallsituationen, analytisches Denken und respektvolle Kommunikation aus. Die deutsche Sprache beherrscht sie auf verhandlungssicherem B2-Niveau.`,
        `Rosy's German School befürwortet ihren Einsatz auf Intensivstationen (ITS) sowie IMC-Stationen deutscher Maximalversorger uneingeschränkt.`
      ]
    },
    {
      label: 'OP & Chirurgie (Surgical Suite)',
      paragraphs: [
        `${candidateName} verfügt über mehrjährige OP-Erfahrung in den Fachbereichen Allgemeinchirurgie und Unfallchirurgie.`,
        `Sie beherrscht sowohl die Instrumentiertätigkeit als auch die Funktion als Springer unter strikter Einhaltung aseptischer Standards. Sie bereitet Instrumententische präzise vor, bedient elektrochirurgische Geräte und Saugsysteme und führt lückenlose Zählkontrollen durch.`,
        `Ihre ruhige Arbeitsweise unter Zeitdruck, ihr Verantwortungsbewusstsein und ihre hervorragende Teamfähigkeit mit chirurgischen und anästhesiologischen Fachkräften zeichnen sie aus.`,
        `Rosy's German School empfiehlt ${candidateName} mit Nachdruck für OP-Abteilungen deutscher Kliniken.`
      ]
    }
  ];

  const handleTitleChange = (val) => {
    onChange({ ...assessment, title: val });
  };

  const handleParagraphChange = (index, val) => {
    const updated = [...(assessment.paragraphs || [])];
    updated[index] = val;
    onChange({ ...assessment, paragraphs: updated });
  };

  const handleAddParagraph = () => {
    const updated = [...(assessment.paragraphs || []), 'Neuer Beurteilungsabsatz...'];
    onChange({ ...assessment, paragraphs: updated });
  };

  const handleRemoveParagraph = (index) => {
    const updated = (assessment.paragraphs || []).filter((_, i) => i !== index);
    onChange({ ...assessment, paragraphs: updated });
  };

  const applyPreset = (preset) => {
    onChange({
      ...assessment,
      paragraphs: preset.paragraphs
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <div>
          <h3 className="text-base font-bold text-slate-800">
            Institutional Assessment (Einschätzung Rosy's German School)
          </h3>
          <p className="text-xs text-slate-500">
            Official evaluation by Rosy's German School for German hospital recruiters
          </p>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="p-3 bg-indigo-50/60 rounded-lg border border-indigo-200">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span className="text-xs font-bold text-indigo-900">
            Quick 1-Click German Clinical Appraisal Presets:
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyPreset(preset)}
              className="text-[11.5px] bg-white hover:bg-indigo-100 text-indigo-800 font-medium px-2.5 py-1 rounded border border-indigo-300 shadow-sm transition"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Assessment Header Title
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={assessment.title || "Einschätzung Rosy's German School"}
          onChange={(e) => handleTitleChange(e.target.value)}
        />
      </div>

      <div className="space-y-3">
        <label className="block text-xs font-semibold text-slate-700">
          Evaluation Paragraphs (in German)
        </label>
        {(assessment.paragraphs || []).map((para, idx) => (
          <div key={idx} className="relative group">
            <textarea
              rows={3}
              className="w-full px-3 py-2 text-xs leading-relaxed border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-800"
              value={para}
              onChange={(e) => handleParagraphChange(idx, e.target.value)}
            />
            {(assessment.paragraphs || []).length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveParagraph(idx)}
                className="absolute top-2 right-2 text-slate-400 hover:text-rose-600 p-1 bg-white/90 rounded shadow-sm transition"
                title="Delete paragraph"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddParagraph}
          className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-semibold pt-1"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Evaluation Paragraph
        </button>
      </div>
    </div>
  );
}
