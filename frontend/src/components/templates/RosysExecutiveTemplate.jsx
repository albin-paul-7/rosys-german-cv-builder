import React from 'react';

export default function RosysExecutiveTemplate({ data, page = 'all' }) {
  const p = data.personalData || {};
  const inst = data.institution || {};
  const assessment = data.assessment || {};
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || {};
  const themeColor = data.themeColor || '#831843';
  const logoSrc = inst.logo || '/rosys-logo.png';

  const footerText = `${inst.name || "Rosy's German School"} • Saroja Complex, Edappally, Kochi • Tel: ${inst.phone || "+91 8921438879"} • ${inst.email || "rosysgermanschool@gmail.com"}`;

  const renderHeader = () => (
    <div className="px-12 pt-7 pb-4 flex justify-between items-center border-b-2" style={{ borderColor: themeColor }}>
      <div className="flex items-center gap-4">
        <img 
          src={logoSrc} 
          alt={inst.name} 
          className="h-12 max-w-[190px] object-contain"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div>
          <div className="text-[17px] font-bold text-slate-900 tracking-tight">{inst.name}</div>
          <div className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: themeColor }}>
            International Healthcare Migration Division
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-[20px] font-extrabold tracking-wider" style={{ color: themeColor }}>
          LEBENSLAUF
        </div>
        <div className="text-[11px] text-slate-500 font-medium">Fachprofil Pflegeberufe (Deutschland)</div>
      </div>
    </div>
  );

  const renderFooter = (pageNumber) => (
    <div className="border-t border-slate-200 px-12 py-3 flex justify-between items-center text-[10.5px] text-slate-600 font-medium mt-auto">
      <div className="truncate max-w-[85%]">{footerText}</div>
      <div className="font-bold text-slate-800">Seite {pageNumber}/2</div>
    </div>
  );

  const renderSectionHeader = (title) => (
    <div className="flex items-center gap-3 my-3">
      <div className="h-4 w-1.5 rounded-sm" style={{ backgroundColor: themeColor }}></div>
      <h3 className="text-[16px] font-bold uppercase tracking-wider text-slate-800 m-0">{title}</h3>
    </div>
  );

  return (
    <div className="flex flex-col gap-8 print:gap-0 items-center justify-center">
      {/* PAGE 1 */}
      {(page === 'all' || page === 1) && (
        <div 
          className="a4-page w-[210mm] min-h-[297mm] h-[297mm] bg-white text-slate-800 shadow-xl flex flex-col justify-between overflow-hidden relative"
          style={{ fontFamily: data.fontFamily || 'Inter, sans-serif' }}
        >
          <div>
            {renderHeader()}

            <div className="px-12 pt-3 pb-6">
              {/* Personal Data Grid */}
              {renderSectionHeader('Persönliche Daten')}
              <div className="flex justify-between items-start mb-4 text-[13px]">
                <table className="flex-1 border-collapse">
                  <tbody>
                    <tr>
                      <td className="w-[190px] py-1 font-bold text-slate-900">Name, Vorname:</td>
                      <td className="py-1 font-semibold text-slate-800">{p.lastName}, {p.firstName}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-bold text-slate-900">Geburtsdaten:</td>
                      <td className="py-1 text-slate-700">{p.dateOfBirth} in {p.placeOfBirth || 'Indien'}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-bold text-slate-900">Herkunftsland:</td>
                      <td className="py-1 text-slate-700">{p.countryOfOrigin || 'Indien'}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-bold text-slate-900">Klinische Ausbildung:</td>
                      <td className="py-1 text-slate-700">{p.qualification}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-bold text-slate-900">Erfahrung:</td>
                      <td className="py-1 text-slate-700">{p.yearsOfExperience}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-bold text-slate-900">Deutschkenntnisse:</td>
                      <td className="py-1 font-bold" style={{ color: themeColor }}>{p.languageProficiency}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-bold text-slate-900">Möglicher Arbeitsbeginn:</td>
                      <td className="py-1 text-slate-700">{p.startDate}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="ml-6 w-[115px] h-[145px] rounded border-2 overflow-hidden shadow-sm flex-shrink-0" style={{ borderColor: themeColor }}>
                  {p.photoUrl ? (
                    <img src={p.photoUrl} alt="Candidate" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-xs text-slate-400">Foto</div>
                  )}
                </div>
              </div>

              {/* Assessment */}
              {renderSectionHeader(assessment.title || "Einschätzung Rosy's German School")}
              <div className="bg-rose-50/30 p-4 rounded border border-rose-100 text-[12.5px] leading-relaxed text-slate-700 space-y-2 mb-4">
                {(assessment.paragraphs || []).map((para, i) => (
                  <p key={i} className="m-0 text-justify">{para}</p>
                ))}
              </div>

              {/* Experience */}
              {renderSectionHeader('Berufliche Erfahrung')}
              {experience.slice(0, 1).map((exp, i) => (
                <div key={i} className="text-[13px] mb-2">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">{exp.role}</span>
                    <span className="font-semibold text-slate-600 text-xs">{exp.period}</span>
                  </div>
                  <div className="text-slate-600 font-medium text-[12.5px] mb-1">{exp.facility}</div>
                  {exp.tasks && (
                    <ul className="list-disc pl-5 text-[12px] text-slate-700 space-y-0.5">
                      {exp.tasks.slice(0, 2).map((t, idx) => (
                        <li key={idx}>{t}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
          {renderFooter(1)}
        </div>
      )}

      {/* PAGE 2 */}
      {(page === 'all' || page === 2) && (
        <div 
          className="a4-page w-[210mm] min-h-[297mm] h-[297mm] bg-white text-slate-800 shadow-xl flex flex-col justify-between overflow-hidden relative"
          style={{ fontFamily: data.fontFamily || 'Inter, sans-serif' }}
        >
          <div>
            {renderHeader()}

            <div className="px-12 pt-3 pb-6">
              {/* Additional tasks */}
              {experience.length > 0 && experience[0].tasks && experience[0].tasks.length > 2 && (
                <div className="mb-4">
                  <ul className="list-disc pl-5 text-[12px] text-slate-700 space-y-1">
                    {experience[0].tasks.slice(2).map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Education */}
              {renderSectionHeader('Akademische & Schulische Ausbildung')}
              <div className="space-y-2.5 mb-5 text-[13px]">
                {education.map((edu, idx) => (
                  <div key={idx} className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-slate-800">{edu.degree}</div>
                      <div className="text-[12px] text-slate-600">{edu.institution}</div>
                    </div>
                    <span className="text-xs font-semibold text-slate-500">{edu.period}</span>
                  </div>
                ))}
              </div>

              {/* Skills & Competencies */}
              {renderSectionHeader('Fachliche & Methodische Kompetenzen')}
              <div className="space-y-3 text-[12.5px]">
                <div>
                  <span className="font-bold text-slate-900 block mb-1">Sprachen:</span>
                  <div className="flex flex-wrap gap-2">
                    {(skills.languages || []).map((l, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-800 px-2.5 py-1 rounded text-xs font-medium border border-slate-200">
                        {l.language}: <strong>{l.level}</strong>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-1">
                  <span className="font-bold text-slate-900 block mb-1">Soziale & persönliche Stärken:</span>
                  <div className="text-slate-700 space-y-0.5">
                    {(skills.socialSkills || []).map((s, idx) => (
                      <div key={idx}>• {s}</div>
                    ))}
                  </div>
                </div>

                <div className="pt-1">
                  <span className="font-bold text-slate-900 block mb-1">Medizinische Apparatekunde & Notfallausrüstung:</span>
                  <div className="grid grid-cols-2 gap-1.5 text-slate-700">
                    {(skills.equipment || []).map((eq, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <span className="text-xs font-bold" style={{ color: themeColor }}>✓</span>
                        <span>{eq}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {renderFooter(2)}
        </div>
      )}
    </div>
  );
}
