import React from 'react';

export default function RosysModernTemplate({ data, page = 'all' }) {
  const p = data.personalData || {};
  const inst = data.institution || {};
  const assessment = data.assessment || {};
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || {};
  const themeColor = data.themeColor || '#0284c7';
  const logoSrc = inst.logo || '/rosys-logo.png';

  const footerText = `${inst.name || "Rosy's German School"} • ${inst.address || "Edappally, Kochi"} • Tel: ${inst.phone || "+91 8921438879"} • ${inst.email || "rosysgermanschool@gmail.com"}`;

  const renderHeader = () => (
    <div className="bg-slate-50 border-b border-slate-200 px-12 py-6 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <img 
          src={logoSrc} 
          alt={inst.name} 
          className="h-12 max-w-[180px] object-contain"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div>
          <div className="text-[17px] font-bold tracking-tight text-slate-900">{inst.name}</div>
          <div className="text-[10px] text-slate-500 font-medium">Healthcare Candidate Dossier • Germany</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span 
          className="text-white text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-wider"
          style={{ backgroundColor: themeColor }}
        >
          {p.languageProficiency || 'Deutsch B2'}
        </span>
        <span className="text-[18px] font-extrabold text-slate-800 tracking-wider">
          LEBENSLAUF
        </span>
      </div>
    </div>
  );

  const renderFooter = (pageNumber) => (
    <div className="border-t border-slate-200 px-12 py-3.5 flex justify-between items-center text-[10.5px] text-slate-500 font-medium mt-auto bg-slate-50/50">
      <div className="truncate max-w-[85%]">{footerText}</div>
      <div className="font-semibold text-slate-700">Seite {pageNumber} / 2</div>
    </div>
  );

  const renderSectionHeading = (title) => (
    <div className="flex items-center gap-3 my-4">
      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: themeColor }}></div>
      <h3 className="text-[17px] font-bold text-slate-800 uppercase tracking-wide m-0">
        {title}
      </h3>
      <div className="flex-1 h-[1.5px] bg-slate-200 ml-2"></div>
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

            <div className="px-12 pt-4 pb-6">
              {/* Profile Card */}
              <div className="bg-sky-50/40 border border-sky-100 rounded-lg p-5 flex justify-between items-start mb-6">
                <div className="flex-1 pr-6">
                  <h1 className="text-2xl font-bold text-slate-900 mb-1">
                    {p.firstName} {p.lastName}
                  </h1>
                  <p className="text-sky-700 font-semibold text-sm mb-4">
                    {p.qualification} • {p.yearsOfExperience}
                  </p>

                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-[12.5px]">
                    <div><span className="font-semibold text-slate-700">Geburtsdaten:</span> {p.dateOfBirth} ({p.placeOfBirth || 'Indien'})</div>
                    <div><span className="font-semibold text-slate-700">Herkunft:</span> {p.countryOfOrigin || 'Indien'}</div>
                    <div><span className="font-semibold text-slate-700">Sprachzertifikat:</span> {p.languageProficiency}</div>
                    <div><span className="font-semibold text-slate-700">Verfügbarkeit:</span> {p.startDate}</div>
                  </div>
                </div>

                <div className="w-[110px] h-[135px] rounded-lg border border-slate-200 overflow-hidden shadow-sm flex-shrink-0">
                  {p.photoUrl ? (
                    <img src={p.photoUrl} alt="Candidate" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-xs text-slate-400">Passbild</div>
                  )}
                </div>
              </div>

              {/* Assessment */}
              {renderSectionHeading(assessment.title || "Einschätzung Rosy's German School")}
              <div className="text-[12.5px] leading-relaxed text-slate-700 space-y-2 mb-6 bg-slate-50/70 p-4 rounded-md border-l-4" style={{ borderColor: themeColor }}>
                {(assessment.paragraphs || []).map((para, i) => (
                  <p key={i} className="m-0 text-justify">{para}</p>
                ))}
              </div>

              {/* Work Experience */}
              {renderSectionHeading('Berufliche Erfahrung')}
              {experience.slice(0, 1).map((exp, i) => (
                <div key={i} className="mb-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-bold text-[14px] text-slate-900">{exp.role}</span>
                    <span className="text-xs font-semibold text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded-full">{exp.period}</span>
                  </div>
                  <div className="text-[12.5px] text-slate-600 font-medium mb-2">{exp.facility}</div>
                  {exp.tasks && (
                    <ul className="list-disc pl-5 text-[12px] text-slate-700 space-y-1">
                      {exp.tasks.slice(0, 3).map((t, idx) => (
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

            <div className="px-12 pt-4 pb-6">
              {/* Additional tasks */}
              {experience.length > 0 && experience[0].tasks && experience[0].tasks.length > 3 && (
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Weitere klinische Aufgaben</h4>
                  <ul className="list-disc pl-5 text-[12px] text-slate-700 space-y-1">
                    {experience[0].tasks.slice(3).map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Education */}
              {renderSectionHeading('Ausbildung & Qualifikationen')}
              <div className="space-y-3 mb-6">
                {education.map((edu, idx) => (
                  <div key={idx} className="flex justify-between items-start border-b border-slate-100 pb-2">
                    <div>
                      <div className="font-bold text-[13.5px] text-slate-900">{edu.degree}</div>
                      <div className="text-[12px] text-slate-600">{edu.institution}</div>
                    </div>
                    <span className="text-[11.5px] font-semibold text-slate-500">{edu.period}</span>
                  </div>
                ))}
              </div>

              {/* Competencies */}
              {renderSectionHeading('Kenntnisse & Fachkompetenzen')}
              <div className="grid grid-cols-2 gap-4 text-[12.5px] mb-4">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="font-bold text-slate-800 mb-2">Sprachkompetenz (CEFR)</div>
                  <div className="space-y-1">
                    {(skills.languages || []).map((l, idx) => (
                      <div key={idx} className="flex justify-between text-xs">
                        <span className="font-medium text-slate-700">{l.language}</span>
                        <span className="font-bold text-sky-800">{l.level}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="font-bold text-slate-800 mb-2">Soziale Kompetenzen</div>
                  <ul className="list-disc pl-4 text-xs text-slate-700 space-y-1">
                    {(skills.socialSkills || []).map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Equipment Grid */}
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-[12px]">
                <div className="font-bold text-slate-900 mb-2">Am Arbeitsplatz beherrschte medizinische Geräte</div>
                <div className="grid grid-cols-2 gap-2 text-slate-700">
                  {(skills.equipment || []).map((eq, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="text-sky-600 font-bold">✓</span>
                      <span>{eq}</span>
                    </div>
                  ))}
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
