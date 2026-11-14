import React, { useState } from 'react';
import { 
  User, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Building2, 
  Palette,
  CheckCircle2
} from 'lucide-react';

import PersonalDetailsForm from './FormSections/PersonalDetailsForm';
import AssessmentForm from './FormSections/AssessmentForm';
import ExperienceForm from './FormSections/ExperienceForm';
import EducationForm from './FormSections/EducationForm';
import SkillsForm from './FormSections/SkillsForm';
import InstituteBrandingForm from './FormSections/InstituteBrandingForm';
import { THEME_COLORS } from '../data/templatesConfig';

export default function ResumeEditor({ resumeData, onChange }) {
  const [activeTab, setActiveTab] = useState('personal');

  const tabs = [
    { id: 'personal', label: 'Personal Data', icon: User, de: 'Persönliche Daten' },
    { id: 'assessment', label: "Rosy's Assessment", icon: FileText, de: 'Einschätzung' },
    { id: 'experience', label: 'Experience', icon: Briefcase, de: 'Berufserfahrung' },
    { id: 'education', label: 'Education', icon: GraduationCap, de: 'Ausbildung' },
    { id: 'skills', label: 'Skills & Devices', icon: Award, de: 'Kompetenzen' },
    { id: 'branding', label: 'Institution Info', icon: Building2, de: 'Institut' }
  ];

  const handleUpdate = (section, data) => {
    onChange({
      ...resumeData,
      [section]: data
    });
  };

  const handleColorChange = (color) => {
    onChange({
      ...resumeData,
      themeColor: color
    });
  };

  return (
    <div className="bg-white border-r border-slate-200 h-full flex flex-col shadow-sm">
      {/* Top Section Tabs */}
      <div className="border-b border-slate-200 bg-slate-50/70 p-2 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition ${
                  isActive
                    ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                <span className="text-[10px] text-slate-400 font-normal hidden sm:inline">({tab.de})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Theme color customizer bar */}
      <div className="px-5 py-2.5 bg-slate-100/60 border-b border-slate-200 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-slate-600 font-medium">
          <Palette className="w-3.5 h-3.5 text-slate-500" />
          <span>Accent Theme:</span>
        </div>
        <div className="flex items-center gap-1.5">
          {THEME_COLORS.map((col) => (
            <button
              key={col.value}
              type="button"
              title={col.name}
              onClick={() => handleColorChange(col.value)}
              className={`w-5 h-5 rounded-full border-2 transition transform hover:scale-110 ${
                resumeData.themeColor === col.value ? 'border-slate-800 ring-2 ring-blue-300' : 'border-white'
              }`}
              style={{ backgroundColor: col.value }}
            />
          ))}
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 overflow-y-auto p-5">
        {activeTab === 'personal' && (
          <PersonalDetailsForm
            personalData={resumeData.personalData || {}}
            onChange={(data) => handleUpdate('personalData', data)}
          />
        )}

        {activeTab === 'assessment' && (
          <AssessmentForm
            assessment={resumeData.assessment || {}}
            personalData={resumeData.personalData || {}}
            onChange={(data) => handleUpdate('assessment', data)}
          />
        )}

        {activeTab === 'experience' && (
          <ExperienceForm
            experience={resumeData.experience || []}
            onChange={(data) => handleUpdate('experience', data)}
          />
        )}

        {activeTab === 'education' && (
          <EducationForm
            education={resumeData.education || []}
            onChange={(data) => handleUpdate('education', data)}
          />
        )}

        {activeTab === 'skills' && (
          <SkillsForm
            skills={resumeData.skills || {}}
            onChange={(data) => handleUpdate('skills', data)}
          />
        )}

        {activeTab === 'branding' && (
          <InstituteBrandingForm
            institution={resumeData.institution || {}}
            onChange={(data) => handleUpdate('institution', data)}
          />
        )}
      </div>
    </div>
  );
}
