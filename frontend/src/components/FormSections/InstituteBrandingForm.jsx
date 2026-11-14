import React from 'react';
import { Building2, RotateCcw } from 'lucide-react';

export default function InstituteBrandingForm({ institution, onChange }) {
  const defaultRosys = {
    name: "Rosy's German School",
    subTitle: "Euronav Overseas & Educational Consultants Pvt. Ltd.",
    address: "1st Floor, Saroja Complex, Bank Junction, Edappally, Kochi, Kerala, India – 682024",
    phone: "+91 8921438879",
    email: "rosysgermanschool@gmail.com",
    website: "www.rosysgermanschool.com",
    logo: "/rosys-logo.png",
    partnerInfo: "Anerkanntes NORKA-SCA Partnerzentrum für Pflegefachkräfte in Deutschland"
  };

  const handleChange = (field, value) => {
    onChange({
      ...institution,
      [field]: value
    });
  };

  const handleResetToOfficial = () => {
    onChange(defaultRosys);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <div>
          <h3 className="text-base font-bold text-slate-800">
            Institution & Header / Footer Branding
          </h3>
          <p className="text-xs text-slate-500">
            Official Rosy's German School contact details printed on the CV footer
          </p>
        </div>
        <button
          type="button"
          onClick={handleResetToOfficial}
          className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset to Rosy's Official
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Institute Name (Institut Name)
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={institution.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </div>

        <div className="col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Organization / Consultancy Subtitle
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={institution.subTitle || ''}
            onChange={(e) => handleChange('subTitle', e.target.value)}
          />
        </div>

        <div className="col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Official Address (Printed in Footer)
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={institution.address || ''}
            onChange={(e) => handleChange('address', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Phone / Hotline
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={institution.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Email Address
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={institution.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </div>

        <div className="col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Official Logo Asset URL
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs"
            value={institution.logo || ''}
            onChange={(e) => handleChange('logo', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
