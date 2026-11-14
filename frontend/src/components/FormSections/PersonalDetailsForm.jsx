import React from 'react';
import { User, Calendar, MapPin, GraduationCap, Clock, Award, Upload, Image } from 'lucide-react';

export default function PersonalDetailsForm({ personalData, onChange }) {
  const handleChange = (field, value) => {
    onChange({
      ...personalData,
      [field]: value
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        handleChange('photoUrl', event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <div>
          <h3 className="text-base font-bold text-slate-800">Personal Data (Persönliche Daten)</h3>
          <p className="text-xs text-slate-500">German healthcare standard candidate profile details</p>
        </div>
        <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-medium border border-blue-200">
          German Format
        </span>
      </div>

      {/* Photo Uploader */}
      <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
        <div className="w-16 h-20 bg-slate-200 rounded border border-slate-300 overflow-hidden flex-shrink-0 flex items-center justify-center">
          {personalData.photoUrl ? (
            <img src={personalData.photoUrl} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <Image className="w-6 h-6 text-slate-400" />
          )}
        </div>
        <div className="flex-1 space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Candidate Photo (Bewerberfoto)
          </label>
          <div className="flex items-center gap-2">
            <label className="cursor-pointer bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs px-3 py-1.5 rounded-md font-medium shadow-sm transition flex items-center gap-1.5">
              <Upload className="w-3.5 h-3.5" />
              Upload Image
              <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
            </label>
            {personalData.photoUrl && (
              <button
                type="button"
                onClick={() => handleChange('photoUrl', '')}
                className="text-xs text-rose-600 hover:text-rose-700 underline font-medium"
              >
                Remove
              </button>
            )}
          </div>
          <p className="text-[11px] text-slate-400">German hospital HR requires clear professional portrait (Passbild)</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Last Name (Nachname) *
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="z.B. Jayaram"
            value={personalData.lastName || ''}
            onChange={(e) => handleChange('lastName', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            First Name (Vorname) *
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="z.B. Gopika"
            value={personalData.firstName || ''}
            onChange={(e) => handleChange('firstName', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Date & Place of Birth (Geburtstag/-ort)
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="31.08.2000, Kerala"
            value={personalData.dateOfBirth || ''}
            onChange={(e) => handleChange('dateOfBirth', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Country of Origin (Herkunftsland)
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Indien"
            value={personalData.countryOfOrigin || ''}
            onChange={(e) => handleChange('countryOfOrigin', e.target.value)}
          />
        </div>

        <div className="col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Highest Nursing Degree (Ausbildung)
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Bachelor of Science (Nursing) oder GNM"
            value={personalData.qualification || ''}
            onChange={(e) => handleChange('qualification', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Experience in Years (Berufserfahrung in Jahren)
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="1 Jahre 6 Monate"
            value={personalData.yearsOfExperience || ''}
            onChange={(e) => handleChange('yearsOfExperience', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            German Language Level (Sprachkenntnisse)
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Deutsch B2 (TELC / Goethe)"
            value={personalData.languageProficiency || ''}
            onChange={(e) => handleChange('languageProficiency', e.target.value)}
          />
        </div>

        <div className="col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Target Start Date in Germany (Arbeitsbeginn)
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="März 2027 oder Sofort nach Anerkennung"
            value={personalData.startDate || ''}
            onChange={(e) => handleChange('startDate', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
