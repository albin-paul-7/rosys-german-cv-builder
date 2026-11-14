import React from 'react';

export default function RosysOfficialTemplate({ data, page = 'all' }) {
  const p = data.personalData || {};
  const inst = data.institution || {};
  const assessment = data.assessment || {};
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || {};
  const themeColor = data.themeColor || '#14477c';
  const logoSrc = inst.logo || '/rosys-logo.png';

  const footerText = `${inst.name || "Rosy's German School"}, ${inst.address || "1st Floor, Saroja Complex, Bank Junction, Edappally, Kochi"} | ${inst.phone || "+91 8921438879"} | ${inst.email || "rosysgermanschool@gmail.com"}`;

  const renderHeader = () => (
    <div className="flex justify-between items-center px-12 pt-8 pb-4">
      {/* Lebenslauf dark blue banner */}
      <div 
        className="text-white font-bold text-[19px] tracking-wide px-8 py-3 rounded-none shadow-sm flex items-center justify-center min-w-[210px]"
        style={{ backgroundColor: themeColor }}
      >
        Lebenslauf
      </div>
      {/* Official Rosy's School Logo */}
      <div className="flex items-center gap-3">
        <img 
          src={logoSrc} 
          alt={inst.name || "Rosy's German School"} 
          className="h-12 max-w-[210px] object-contain"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <div className="text-right">
          <div className="text-[14px] font-bold text-slate-800 tracking-tight leading-none uppercase">
            {inst.name || "Rosy's German School"}
          </div>
          <div className="text-[9.5px] font-medium text-slate-500 mt-0.5">
            {inst.subTitle || "Euronav Overseas & Educational Consultants"}
          </div>
        </div>
      </div>
    </div>
  );

  const renderFooter = (pageNumber, totalPages = 2) => (
    <div className="border-t border-slate-200 px-12 py-3.5 flex justify-between items-center text-[11px] text-[#1a4f8b] font-medium mt-auto">
      <div className="truncate max-w-[85%]">{footerText}</div>
      <div className="font-bold text-slate-700 whitespace-nowrap">Seite {pageNumber}/{totalPages}</div>
    </div>
  );

  const renderSectionHeader = (title) => (
    <div className="flex items-center gap-4 mt-4 mb-3">
      <div 
        className="h-[5px] w-[130px] flex-shrink-0" 
        style={{ backgroundColor: themeColor }}
      />
      <h2 className="text-[19px] font-semibold text-[#255285] tracking-tight m-0">
        {title}
      </h2>
    </div>
  );

  return (
    <div className="flex flex-col gap-8 print:gap-0 items-center justify-center">
      {/* ======================= PAGE 1 ======================= */}
      {(page === 'all' || page === 1) && (
        <div 
          className="a4-page w-[210mm] min-h-[297mm] h-[297mm] bg-white text-slate-800 shadow-xl flex flex-col justify-between overflow-hidden relative"
          style={{ fontFamily: data.fontFamily || 'Inter, sans-serif' }}
        >
          <div>
            {renderHeader()}

            <div className="px-12 pt-2 pb-6">
              {/* Section: Persönliche Daten */}
              {renderSectionHeader('Persönliche Daten')}

              <div className="flex justify-between items-start mt-2 mb-4">
                <table className="flex-1 text-[13px] border-collapse">
                  <tbody>
                    <tr>
                      <td className="w-[190px] py-1 font-bold text-slate-900">Nachname, Vorname</td>
                      <td className="py-1 text-[#2d5282] font-medium">
                        {p.lastName ? `${p.lastName}, ` : ''}{p.firstName || ''}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 font-bold text-slate-900">Geburtstag/-ort</td>
                      <td className="py-1 text-[#2d5282]">
                        {p.dateOfBirth || ''}{p.placeOfBirth ? `, ${p.placeOfBirth}` : ''}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 font-bold text-slate-900">Herkunftsland</td>
                      <td className="py-1 text-[#2d5282]">{p.countryOfOrigin || 'Indien'}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-bold text-slate-900">Ausbildung</td>
                      <td className="py-1 text-[#2d5282]">{p.qualification || 'Bachelor of Science (Nursing)'}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-bold text-slate-900">Berufserfahrung in Jahren</td>
                      <td className="py-1 text-[#2d5282]">{p.yearsOfExperience || '1 Jahre 6 Monate'}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-bold text-slate-900">Sprachkenntnisse</td>
                      <td className="py-1 text-[#2d5282] font-semibold">{p.languageProficiency || 'Deutsch B2'}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-bold text-slate-900">Arbeitsbeginn</td>
                      <td className="py-1 text-[#2d5282]">{p.startDate || 'März 2027'}</td>
                    </tr>
                  </tbody>
                </table>

                {/* Candidate Photo */}
                <div className="ml-6 w-[120px] h-[150px] border border-slate-200 bg-slate-100 flex-shrink-0 overflow-hidden shadow-sm">
                  {p.photoUrl ? (
                    <img 
                      src={p.photoUrl} 
                      alt={`${p.firstName || ''} ${p.lastName || ''}`} 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 text-xs text-center p-2">
                      <span>Bewerberfoto</span>
                      <span className="text-[10px] text-slate-300">(Passbild)</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Section: Einschätzung Rosy's German School */}
              <div className="flex items-start mt-3 mb-4 text-[12.8px] leading-[1.48]">
                <div className="w-[190px] font-bold text-slate-900 flex-shrink-0 pt-0.5">
                  {assessment.title || "Einschätzung Rosy's German School"}
                </div>
                <div className="flex-1 text-slate-700 text-justify space-y-2">
                  {(assessment.paragraphs || []).map((para, idx) => (
                    <p key={idx} className="m-0">{para}</p>
                  ))}
                </div>
              </div>

              {/* Section: Berufliche Erfahrung (Part 1) */}
              {renderSectionHeader('Berufliche Erfahrung')}

              {experience.slice(0, 1).map((exp, idx) => (
                <div key={idx} className="flex items-start text-[13px] mb-2">
                  <div className="w-[190px] font-bold text-slate-900 flex-shrink-0">
                    {exp.period}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-[#1a4f8b] text-[13.5px]">
                      {exp.role}
                    </div>
                    <div className="text-[#2b5788] mb-1">
                      {exp.facility}
                    </div>
                    {exp.tasks && exp.tasks.length > 0 && (
                      <div>
                        <div className="font-semibold text-slate-700 text-[12.5px] mt-1 mb-0.5">
                          Aufgaben:
                        </div>
                        <ul className="list-disc pl-5 m-0 space-y-0.5 text-slate-700 text-[12.5px]">
                          {exp.tasks.slice(0, 2).map((task, tIdx) => (
                            <li key={tIdx}>{task}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {renderFooter(1, 2)}
        </div>
      )}

      {/* ======================= PAGE 2 ======================= */}
      {(page === 'all' || page === 2) && (
        <div 
          className="a4-page w-[210mm] min-h-[297mm] h-[297mm] bg-white text-slate-800 shadow-xl flex flex-col justify-between overflow-hidden relative"
          style={{ fontFamily: data.fontFamily || 'Inter, sans-serif' }}
        >
          <div>
            {renderHeader()}

            <div className="px-12 pt-2 pb-6">
              {/* Fortsetzung der Aufgaben von Seite 1 */}
              {experience.length > 0 && experience[0].tasks && experience[0].tasks.length > 2 && (
                <div className="flex items-start text-[12.5px] mb-4">
                  <div className="w-[190px] flex-shrink-0"></div>
                  <div className="flex-1">
                    <ul className="list-disc pl-5 m-0 space-y-1 text-slate-700">
                      {experience[0].tasks.slice(2).map((task, tIdx) => (
                        <li key={tIdx}>{task}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Additional Experiences if any */}
              {experience.slice(1).map((exp, idx) => (
                <div key={idx} className="flex items-start text-[13px] mb-3">
                  <div className="w-[190px] font-bold text-slate-900 flex-shrink-0">
                    {exp.period}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-[#1a4f8b]">{exp.role}</div>
                    <div className="text-[#2b5788] mb-0.5">{exp.facility}</div>
                    {exp.tasks && exp.tasks.length > 0 && (
                      <ul className="list-disc pl-5 m-0 space-y-0.5 text-slate-700 text-[12.5px]">
                        {exp.tasks.map((task, tIdx) => (
                          <li key={tIdx}>{task}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}

              {/* Section: Ausbildung */}
              {renderSectionHeader('Ausbildung')}

              <div className="space-y-3 mb-6">
                {education.map((edu, idx) => (
                  <div key={idx} className="flex items-start text-[13px]">
                    <div className="w-[190px] font-bold text-slate-900 flex-shrink-0">
                      {edu.period}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-[#1a4f8b]">{edu.degree}</div>
                      <div className="text-[#2b5788]">{edu.institution}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Section: Kenntnisse und Kompetenzen */}
              {renderSectionHeader('Kenntnisse und Kompetenzen')}

              <div className="space-y-3 text-[13px]">
                {/* Sprachkenntnisse */}
                <div className="flex items-start">
                  <div className="w-[190px] font-bold text-slate-900 flex-shrink-0">
                    Sprachkenntnisse
                  </div>
                  <div className="flex-1 space-y-0.5 text-slate-800">
                    {(skills.languages || []).map((lang, idx) => (
                      <div key={idx}>
                        <span className="font-medium">{lang.language}</span> – {lang.level}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Soziale Kompetenzen */}
                <div className="flex items-start pt-1">
                  <div className="w-[190px] font-bold text-slate-900 flex-shrink-0">
                    Soziale Kompetenzen
                  </div>
                  <div className="flex-1 space-y-0.5 text-slate-800">
                    {(skills.socialSkills || []).map((skill, idx) => (
                      <div key={idx}>{skill}</div>
                    ))}
                  </div>
                </div>

                {/* EDV / IT-Kenntnisse */}
                <div className="flex items-start pt-1">
                  <div className="w-[190px] font-bold text-slate-900 flex-shrink-0">
                    EDV / IT-Kenntnisse
                  </div>
                  <div className="flex-1 space-y-0.5 text-slate-800">
                    {(skills.itSkills || []).map((it, idx) => (
                      <div key={idx}>{it}</div>
                    ))}
                  </div>
                </div>

                {/* Am Arbeitsplatz verwendete Geräte */}
                <div className="flex items-start pt-1">
                  <div className="w-[190px] font-bold text-slate-900 flex-shrink-0">
                    Am Arbeitsplatz verwendete<br />Geräte
                  </div>
                  <div className="flex-1 space-y-0.5 text-slate-800">
                    {(skills.equipment || []).map((eq, idx) => (
                      <div key={idx}>{eq}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {renderFooter(2, 2)}
        </div>
      )}
    </div>
  );
}
