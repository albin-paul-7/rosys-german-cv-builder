import React from 'react';
import { Plus, Trash2, CheckCircle2 } from 'lucide-react';

export default function SkillsForm({ skills, onChange }) {
  const commonEquipmentSuggestions = [
    "EKG-Gerät und Herzmonitor",
    "Pulsoxymeter",
    "Defibrillator und Notfallausrüstung (Crash Cart, Ambu-Beutel)",
    "Absauggerät",
    "Spritzen- und Infusionspumpe",
    "BiPAP-Gerät",
    "Blutzuckermessgerät",
    "Beatmungsgerät (Hamilton / Dräger)",
    "Blutgasanalyse-Gerät (BGA)",
    "Perfusor / Infusomat"
  ];

  const handleLanguageChange = (index, field, value) => {
    const updated = [...(skills.languages || [])];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...skills, languages: updated });
  };

  const handleAddLanguage = () => {
    const updated = [...(skills.languages || []), { language: 'Sprache', level: 'B1' }];
    onChange({ ...skills, languages: updated });
  };

  const handleRemoveLanguage = (index) => {
    onChange({
      ...skills,
      languages: skills.languages.filter((_, i) => i !== index)
    });
  };

  const handleSimpleListChange = (key, index, value) => {
    const updated = [...(skills[key] || [])];
    updated[index] = value;
    onChange({ ...skills, [key]: updated });
  };

  const handleAddSimpleListItem = (key, defaultText) => {
    const updated = [...(skills[key] || []), defaultText];
    onChange({ ...skills, [key]: updated });
  };

  const handleRemoveSimpleListItem = (key, index) => {
    onChange({
      ...skills,
      [key]: (skills[key] || []).filter((_, i) => i !== index)
    });
  };

  const toggleEquipmentTag = (tag) => {
    const current = skills.equipment || [];
    if (current.includes(tag)) {
      onChange({ ...skills, equipment: current.filter(item => item !== tag) });
    } else {
      onChange({ ...skills, equipment: [...current, tag] });
    }
  };

  return (
    <div className="space-y-5">
      <div className="pb-2 border-b border-slate-200">
        <h3 className="text-base font-bold text-slate-800">
          Skills & Competencies (Kenntnisse und Kompetenzen)
        </h3>
        <p className="text-xs text-slate-500">
          Languages, soft skills, clinical apparatus, and IT knowledge
        </p>
      </div>

      {/* Languages */}
      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wide">
            Language Skills (Sprachkenntnisse)
          </label>
          <button
            type="button"
            onClick={handleAddLanguage}
            className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Language
          </button>
        </div>

        <div className="space-y-2">
          {(skills.languages || []).map((lang, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Language (z.B. Deutsch)"
                className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={lang.language}
                onChange={(e) => handleLanguageChange(idx, 'language', e.target.value)}
              />
              <input
                type="text"
                placeholder="Level (z.B. B2 / Muttersprache)"
                className="w-36 px-3 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={lang.level}
                onChange={(e) => handleLanguageChange(idx, 'level', e.target.value)}
              />
              <button
                type="button"
                onClick={() => handleRemoveLanguage(idx)}
                className="text-slate-400 hover:text-rose-600 p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Social Competencies */}
      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wide">
            Social Competencies (Soziale Kompetenzen)
          </label>
          <button
            type="button"
            onClick={() => handleAddSimpleListItem('socialSkills', 'Neue soziale Kompetenz...')}
            className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Competency
          </button>
        </div>

        <div className="space-y-1.5">
          {(skills.socialSkills || []).map((skill, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={skill}
                onChange={(e) => handleSimpleListChange('socialSkills', idx, e.target.value)}
              />
              <button
                type="button"
                onClick={() => handleRemoveSimpleListItem('socialSkills', idx)}
                className="text-slate-400 hover:text-rose-600 p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* IT Skills */}
      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wide">
            IT & Systems (EDV / IT-Kenntnisse)
          </label>
          <button
            type="button"
            onClick={() => handleAddSimpleListItem('itSkills', 'Krankenhausinformationssysteme')}
            className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add IT Skill
          </button>
        </div>

        <div className="space-y-1.5">
          {(skills.itSkills || []).map((it, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={it}
                onChange={(e) => handleSimpleListChange('itSkills', idx, e.target.value)}
              />
              <button
                type="button"
                onClick={() => handleRemoveSimpleListItem('itSkills', idx)}
                className="text-slate-400 hover:text-rose-600 p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Medical Equipment */}
      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wide">
            Clinical Devices & Equipment (Am Arbeitsplatz verwendete Geräte)
          </label>
          <button
            type="button"
            onClick={() => handleAddSimpleListItem('equipment', 'Neues medizinisches Gerät')}
            className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Custom
          </button>
        </div>

        {/* Quick Click Suggestions */}
        <div className="mb-3">
          <div className="text-[11px] font-semibold text-slate-500 mb-1.5">
            Quick Toggle Medical Equipment:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {commonEquipmentSuggestions.map((item, idx) => {
              const active = (skills.equipment || []).includes(item);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleEquipmentTag(item)}
                  className={`text-[11px] px-2.5 py-1 rounded-full font-medium transition flex items-center gap-1 ${
                    active 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {active && <CheckCircle2 className="w-3 h-3 text-white" />}
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-1.5">
          {(skills.equipment || []).map((eq, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={eq}
                onChange={(e) => handleSimpleListChange('equipment', idx, e.target.value)}
              />
              <button
                type="button"
                onClick={() => handleRemoveSimpleListItem('equipment', idx)}
                className="text-slate-400 hover:text-rose-600 p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
