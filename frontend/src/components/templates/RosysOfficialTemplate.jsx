import React from 'react';

export default function RosysOfficialTemplate({ data, page = 'all' }) {
  const p = data.personalData || {};
  const inst = data.institution || {};
  const assessment = data.assessment || {};
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || {};
  const themeColor = data.themeColor || '#18181b';
  const logoSrc = inst.logo || '/rosys-logo.png';

  const footerText = `${inst.name || "Rosy's German School"}, ${inst.address || "1st Floor, Saroja Complex, Bank Junction, Edappally, Kochi"} | ${inst.phone || "+91 8921438879"} | ${inst.email || "rosysgermanschool@gmail.com"}`;

  const renderHeader = () => (
    <div className="flex justify-between items-center px-12 pt-7 pb-3">
      {/* Lebenslauf Banner with German Flag Tricolor Stripe */}
      <div className="flex flex-col shadow-xs">
        <div 
          className="text-white font-black text-[20px] tracking-wider px-8 py-2.5 flex items-center justify-center min-w-[210px] uppercase"
          style={{ backgroundColor: themeColor }}
        >
          Lebenslauf
        </div>
        <div className="flex h-[3.5px] w-full">
          <div className="w-1/3 bg-[#18181b]"></div>
          <div className="w-1/3 bg-[#dc2626]"></div>
          <div className="w-1/3 bg-[#f59e0b]"></div>
        </div>
      </div>

      {/* Official Rosy's German School Logo */}
      <div className="flex items-center gap-3">
        <img 
          src={logoSrc} 
          alt={inst.name || "Rosy's German School"} 
          className="h-14 max-w-[220px] object-contain"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>
    </div>
  );

  const renderFooter = (pageNumber, totalPages = 2) => (
    <div className="border-t border-slate-200 px-12 py-3 flex justify-between items-center text-[11px] text-slate-600 font-medium mt-auto">
      <div className="truncate max-w-[85%]">{footerText}</div>
      <div className="font-bold text-slate-800 whitespace-nowrap">Seite {pageNumber}/{totalPages}</div>
    </div>
  );

  const renderSectionHeader = (title) => (
    <div className="flex items-center gap-3.5 mt-3.5 mb-2.5">
      <div className="flex items-center">
        <div 
          className="h-[5px] w-[110px]" 
          style={{ backgroundColor: themeColor }}
        />
        <div className="h-[5px] w-[25px] bg-[#dc2626]" />
      </div>
      <h2 className="text-[18px] font-bold text-slate-900 tracking-tight m-0 uppercase">
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

            <div className="px-12 pt-1 pb-6">
              {/* Section: Persönliche Daten */}
              {renderSectionHeader('Persönliche Daten')}

              <div className="flex justify-between items-start mt-1.5 mb-3.5">
                <table className="flex-1 text-[13px] border-collapse">
                  <tbody>
                    <tr>
                      <td className="w-[190px] py-1 font-bold text-slate-900">Nachname, Vorname</td>
                      <td className="py-1 text-slate-900 font-semibold">
                        {p.lastName ? `${p.lastName}, ` : ''}{p.firstName || ''}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 font-bold text-slate-900">Geburtstag/-ort</td>
                      <td className="py-1 text-slate-700">
                        {p.dateOfBirth || ''}{p.placeOfBirth ? `, ${p.placeOfBirth}` : ''}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 font-bold text-slate-900">Herkunftsland</td>
                      <td className="py-1 text-slate-700">{p.countryOfOrigin || ''}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-bold text-slate-900">Ausbildung</td>
                      <td className="py-1 text-slate-700">{p.qualification || ''}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-bold text-slate-900">Berufserfahrung in Jahren</td>
                      <td className="py-1 text-slate-700">{p.yearsOfExperience || ''}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-bold text-slate-900">Sprachkenntnisse</td>
                      <td className="py-1 font-bold text-rose-700">{p.languageProficiency || ''}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-bold text-slate-900">Arbeitsbeginn</td>
                      <td className="py-1 text-slate-700">{p.startDate || ''}</td>
                    </tr>
                  </tbody>
                </table>

                {/* Candidate Photo */}
                <div className="ml-6 w-[120px] h-[150px] border border-slate-300 bg-slate-50 flex-shrink-0 overflow-hidden shadow-xs">
                  {p.photoUrl ? (
                    <img 
                      src={p.photoUrl} 
                      alt={`${p.firstName || ''} ${p.lastName || ''}`} 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 text-xs text-center p-2">
                      <span>Bewerberfoto</span>
                      <span className="text-[10px] text-slate-400">(Passbild)</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Section: Einschätzung Rosy's German School */}
              <div className="flex items-start mt-2 mb-3.5 text-[12.8px] leading-[1.48]">
                <div className="w-[190px] font-bold text-slate-900 flex-shrink-0 pt-0.5">
                  {assessment.title || "Einschätzung Rosy's German School"}
                </div>
                <div className="flex-1 text-slate-700 text-justify space-y-2">
                  {(assessment.paragraphs || []).length > 0 ? (
                    assessment.paragraphs.map((para, idx) => (
                      <p key={idx} className="m-0">{para}</p>
                    ))
                  ) : (
                    <p className="text-slate-400 italic text-xs m-0">
                      [Noch keine Einschätzung hinterlegt – Nutzen Sie die Vorlagen im Editor]
                    </p>
                  )}
                </div>
              </div>

              {/* Section: Berufliche Erfahrung (Part 1) */}
              {renderSectionHeader('Berufliche Erfahrung')}

              {experience.length > 0 ? (
                experience.slice(0, 1).map((exp, idx) => (
                  <div key={idx} className="flex items-start text-[13px] mb-2">
                    <div className="w-[190px] font-bold text-slate-900 flex-shrink-0">
                      {exp.period}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-rose-700 text-[13.5px]">
                        {exp.role}
                      </div>
                      <div className="text-slate-600 mb-1">
                        {exp.facility}
                      </div>
                      {exp.tasks && exp.tasks.length > 0 && (
                        <div>
                          <div className="font-semibold text-slate-800 text-[12.5px] mt-1 mb-0.5">
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
                ))
              ) : (
                <div className="text-slate-400 italic text-xs py-1">
                  [Noch keine Berufserfahrung eingetragen – Bitte im Editor erfassen]
                </div>
              )}
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

            <div className="px-12 pt-1 pb-6">
              {/* Fortsetzung der Aufgaben von Seite 1 */}
              {experience.length > 0 && experience[0].tasks && experience[0].tasks.length > 2 && (
                <div className="flex items-start text-[12.5px] mb-3">
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
                    <div className="font-bold text-rose-700">{exp.role}</div>
                    <div className="text-slate-600 mb-0.5">{exp.facility}</div>
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

              <div className="space-y-2.5 mb-5">
                {education.length > 0 ? (
                  education.map((edu, idx) => (
                    <div key={idx} className="flex items-start text-[13px]">
                      <div className="w-[190px] font-bold text-slate-900 flex-shrink-0">
                        {edu.period}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-slate-900">{edu.degree}</div>
                        <div className="text-slate-600">{edu.institution}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-slate-400 italic text-xs py-1">
                    [Noch keine Ausbildung eingetragen – Bitte im Editor erfassen]
                  </div>
                )}
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
                    {(skills.languages || []).length > 0 ? (
                      skills.languages.map((lang, idx) => (
                        <div key={idx}>
                          <span className="font-semibold">{lang.language}</span> – {lang.level}
                        </div>
                      ))
                    ) : (
                      <span className="text-slate-400 italic text-xs">[Noch keine Sprachen eingetragen]</span>
                    )}
                  </div>
                </div>

                {/* Soziale Kompetenzen */}
                <div className="flex items-start pt-1">
                  <div className="w-[190px] font-bold text-slate-900 flex-shrink-0">
                    Soziale Kompetenzen
                  </div>
                  <div className="flex-1 space-y-0.5 text-slate-800">
                    {(skills.socialSkills || []).length > 0 ? (
                      skills.socialSkills.map((skill, idx) => (
                        <div key={idx}>{skill}</div>
                      ))
                    ) : (
                      <span className="text-slate-400 italic text-xs">[Noch keine sozialen Kompetenzen hinterlegt]</span>
                    )}
                  </div>
                </div>

                {/* EDV / IT-Kenntnisse */}
                <div className="flex items-start pt-1">
                  <div className="w-[190px] font-bold text-slate-900 flex-shrink-0">
                    EDV / IT-Kenntnisse
                  </div>
                  <div className="flex-1 space-y-0.5 text-slate-800">
                    {(skills.itSkills || []).length > 0 ? (
                      skills.itSkills.map((it, idx) => (
                        <div key={idx}>{it}</div>
                      ))
                    ) : (
                      <span className="text-slate-400 italic text-xs">[Noch keine IT-Kenntnisse hinterlegt]</span>
                    )}
                  </div>
                </div>

                {/* Am Arbeitsplatz verwendete Geräte */}
                <div className="flex items-start pt-1">
                  <div className="w-[190px] font-bold text-slate-900 flex-shrink-0">
                    Am Arbeitsplatz verwendete<br />Geräte
                  </div>
                  <div className="flex-1 space-y-0.5 text-slate-800">
                    {(skills.equipment || []).length > 0 ? (
                      skills.equipment.map((eq, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <span className="text-rose-600 font-bold text-xs">✓</span>
                          <span>{eq}</span>
                        </div>
                      ))
                    ) : (
                      <span className="text-slate-400 italic text-xs">[Noch keine Geräte ausgewählt]</span>
                    )}
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
