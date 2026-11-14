import React from 'react';

export default function RosysMinimalTemplate({ data, page = 'all' }) {
  const p = data.personalData || {};
  const inst = data.institution || {};
  const assessment = data.assessment || {};
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || {};
  const themeColor = data.themeColor || '#1e293b';
  const logoSrc = inst.logo || '/rosys-logo.png';

  const footerText = `${inst.name || "Rosy's German School"} | ${inst.address || "Edappally, Kochi"} | Tel: ${inst.phone || "+91 8921438879"} | ${inst.email || "rosysgermanschool@gmail.com"}`;

  const renderHeader = () => (
    <div className="px-12 pt-8 pb-4 flex justify-between items-center border-b border-slate-300">
      <div className="flex items-center gap-3">
        <img 
          src={logoSrc} 
          alt={inst.name} 
          className="h-10 max-w-[160px] object-contain"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div>
          <div className="text-[15px] font-bold text-slate-900">{inst.name}</div>
          <div className="text-[10px] text-slate-500">Kandidatenprofil für deutsche Kliniken</div>
        </div>
      </div>
      <div className="text-xl font-bold tracking-tight text-slate-900">
        LEBENSLAUF
      </div>
    </div>
  );

  const renderFooter = (pageNumber) => (
    <div className="border-t border-slate-300 px-12 py-3 flex justify-between items-center text-[10px] text-slate-500 mt-auto">
      <div className="truncate max-w-[85%]">{footerText}</div>
      <div className="font-semibold text-slate-700">Seite {pageNumber}/2</div>
    </div>
  );

  const renderTitle = (title) => (
    <div className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mt-4 mb-3">
      {title}
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
              {renderTitle('Persönliche Daten')}
              <div className="flex justify-between items-start mb-4 text-[13px]">
                <table className="flex-1 border-collapse">
                  <tbody>
                    <tr>
                      <td className="w-[180px] py-1 font-bold text-slate-900">Name:</td>
                      <td className="py-1">{p.lastName}, {p.firstName}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-bold text-slate-900">Geburtsdatum & -ort:</td>
                      <td className="py-1">{p.dateOfBirth} ({p.placeOfBirth || 'Indien'})</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-bold text-slate-900">Staatsangehörigkeit:</td>
                      <td className="py-1">{p.countryOfOrigin || 'Indien'}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-bold text-slate-900">Abschluss:</td>
                      <td className="py-1">{p.qualification}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-bold text-slate-900">Berufserfahrung:</td>
                      <td className="py-1">{p.yearsOfExperience}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-bold text-slate-900">Sprachniveau:</td>
                      <td className="py-1 font-semibold text-slate-900">{p.languageProficiency}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-bold text-slate-900">Verfügbarkeit:</td>
                      <td className="py-1">{p.startDate}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="ml-6 w-[110px] h-[140px] border border-slate-300 overflow-hidden flex-shrink-0">
                  {p.photoUrl ? (
                    <img src={p.photoUrl} alt="Candidate" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-slate-50 flex items-center justify-center text-xs text-slate-400">Foto</div>
                  )}
                </div>
              </div>

              {renderTitle(assessment.title || "Einschätzung Rosy's German School")}
              <div className="text-[12.5px] leading-relaxed text-slate-700 space-y-2 mb-4">
                {(assessment.paragraphs || []).map((para, i) => (
                  <p key={i} className="m-0 text-justify">{para}</p>
                ))}
              </div>

              {renderTitle('Berufliche Erfahrung')}
              {experience.slice(0, 1).map((exp, i) => (
                <div key={i} className="text-[13px] mb-2">
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span>{exp.role}</span>
                    <span className="text-xs font-normal text-slate-600">{exp.period}</span>
                  </div>
                  <div className="text-slate-600 text-xs mb-1">{exp.facility}</div>
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

              {renderTitle('Ausbildung')}
              <div className="space-y-2 mb-4 text-[13px]">
                {education.map((edu, idx) => (
                  <div key={idx} className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-slate-800">{edu.degree}</div>
                      <div className="text-xs text-slate-600">{edu.institution}</div>
                    </div>
                    <span className="text-xs text-slate-500">{edu.period}</span>
                  </div>
                ))}
              </div>

              {renderTitle('Kenntnisse und Qualifikationen')}
              <div className="space-y-3 text-[12.5px]">
                <div className="flex">
                  <div className="w-[180px] font-bold text-slate-900">Sprachen:</div>
                  <div className="flex-1">
                    {(skills.languages || []).map((l, idx) => (
                      <span key={idx} className="inline-block mr-4">
                        {l.language} ({l.level})
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex">
                  <div className="w-[180px] font-bold text-slate-900">Sozialkompetenz:</div>
                  <div className="flex-1 text-slate-700">
                    {(skills.socialSkills || []).join(', ')}
                  </div>
                </div>

                <div className="flex">
                  <div className="w-[180px] font-bold text-slate-900">Geräte & Praxis:</div>
                  <div className="flex-1 text-slate-700">
                    {(skills.equipment || []).join(', ')}
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
