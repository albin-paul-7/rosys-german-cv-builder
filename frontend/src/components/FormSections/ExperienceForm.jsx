import React from 'react';
import { Plus, Trash2, Briefcase } from 'lucide-react';

export default function ExperienceForm({ experience, onChange }) {
  const handleItemChange = (index, field, value) => {
    const updated = [...experience];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleTaskChange = (expIndex, taskIndex, value) => {
    const updated = [...experience];
    const tasks = [...(updated[expIndex].tasks || [])];
    tasks[taskIndex] = value;
    updated[expIndex].tasks = tasks;
    onChange(updated);
  };

  const handleAddTask = (expIndex) => {
    const updated = [...experience];
    const tasks = [...(updated[expIndex].tasks || []), 'Neue pflegerische Tätigkeit...'];
    updated[expIndex].tasks = tasks;
    onChange(updated);
  };

  const handleRemoveTask = (expIndex, taskIndex) => {
    const updated = [...experience];
    updated[expIndex].tasks = updated[expIndex].tasks.filter((_, i) => i !== taskIndex);
    onChange(updated);
  };

  const handleAddExperience = () => {
    const newItem = {
      id: `exp-${Date.now()}`,
      period: '01/2024 – Heute',
      role: 'Pflegefachkraft',
      facility: 'am Universitätsklinikum / Krankenhaus',
      tasks: [
        'Pflegerische Betreuung und Überwachung von Patienten',
        'Verabreichung ärztlich verordneter Medikamente und Infusionen'
      ]
    };
    onChange([...experience, newItem]);
  };

  const handleRemoveExperience = (index) => {
    onChange(experience.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <div>
          <h3 className="text-base font-bold text-slate-800">
            Work Experience (Berufliche Erfahrung)
          </h3>
          <p className="text-xs text-slate-500">
            Clinical history, hospital positions, and nursing duties
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddExperience}
          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-md shadow-sm transition"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Position
        </button>
      </div>

      <div className="space-y-4">
        {experience.map((exp, expIdx) => (
          <div key={exp.id || expIdx} className="p-4 bg-slate-50 rounded-lg border border-slate-200 relative">
            {experience.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveExperience(expIdx)}
                className="absolute top-3 right-3 text-slate-400 hover:text-rose-600 transition"
                title="Remove experience"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Time Period (Zeitraum: MM/YYYY – MM/YYYY)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="09/2024 – 03/2026"
                  value={exp.period || ''}
                  onChange={(e) => handleItemChange(expIdx, 'period', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Job Title in German (Berufsbezeichnung)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Pflegefachfrau, Kardiologie"
                  value={exp.role || ''}
                  onChange={(e) => handleItemChange(expIdx, 'role', e.target.value)}
                />
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Hospital / Institution & City (Einrichtung & Ort)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="bei Sree Gokulam Medical College in Venjaramoodu"
                  value={exp.facility || ''}
                  onChange={(e) => handleItemChange(expIdx, 'facility', e.target.value)}
                />
              </div>
            </div>

            {/* Tasks list */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Clinical Duties (Aufgaben)
              </label>
              <div className="space-y-1.5">
                {(exp.tasks || []).map((task, tIdx) => (
                  <div key={tIdx} className="flex items-center gap-2">
                    <span className="text-slate-400 text-xs">•</span>
                    <input
                      type="text"
                      className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      value={task}
                      onChange={(e) => handleTaskChange(expIdx, tIdx, e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveTask(expIdx, tIdx)}
                      className="text-slate-400 hover:text-rose-600 transition"
                      title="Remove task"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => handleAddTask(expIdx)}
                className="mt-2 flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Duty / Task
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
