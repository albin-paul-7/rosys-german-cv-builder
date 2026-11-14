import React from 'react';
import { Plus, Trash2, GraduationCap } from 'lucide-react';

export default function EducationForm({ education, onChange }) {
  const handleItemChange = (index, field, value) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleAddEducation = () => {
    const newItem = {
      id: `edu-${Date.now()}`,
      period: '06/2020 – 09/2024',
      degree: 'Bachelor of Science in Krankenpflege',
      institution: 'an College of Nursing'
    };
    onChange([...education, newItem]);
  };

  const handleRemoveEducation = (index) => {
    onChange(education.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <div>
          <h3 className="text-base font-bold text-slate-800">
            Education (Ausbildung)
          </h3>
          <p className="text-xs text-slate-500">
            Academic degrees, nursing colleges, and school qualifications
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddEducation}
          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-md shadow-sm transition"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Education
        </button>
      </div>

      <div className="space-y-3">
        {education.map((edu, idx) => (
          <div key={edu.id || idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 relative">
            {education.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveEducation(idx)}
                className="absolute top-2.5 right-2.5 text-slate-400 hover:text-rose-600 transition"
                title="Remove degree"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Time Period (MM/YYYY – MM/YYYY)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="06/2020 – 09/2024"
                  value={edu.period || ''}
                  onChange={(e) => handleItemChange(idx, 'period', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Degree / School Type in German
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Bachelor of Science in Krankenpflege"
                  value={edu.degree || ''}
                  onChange={(e) => handleItemChange(idx, 'degree', e.target.value)}
                />
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Educational Institution (an Sree Gokulam Medical College)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="an Sree Gokulam Medical College"
                  value={edu.institution || ''}
                  onChange={(e) => handleItemChange(idx, 'institution', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
