export const initialRosysCvData = {
  id: "sample-gopika-jayaram",
  name: "Gopika Jayaram - Kardiologie",
  updatedAt: new Date().toISOString(),
  template: "rosys-official",
  themeColor: "#14477c",
  fontFamily: "Inter, sans-serif",
  institution: {
    name: "Rosy's German School",
    subTitle: "Euronav Overseas & Educational Consultants Pvt. Ltd.",
    address: "1st Floor, Saroja Complex, Bank Junction, Edappally, Kochi, Kerala, India – 682024",
    phone: "+91 8921438879",
    email: "rosysgermanschool@gmail.com",
    website: "www.rosysgermanschool.com",
    logo: "/rosys-logo.png",
    partnerInfo: "NORKA-SCA Ausbildungs- und Vermittlungspartner für deutsche Kliniken"
  },
  personalData: {
    lastName: "Jayaram",
    firstName: "Gopika",
    dateOfBirth: "31.08.2000",
    placeOfBirth: "Kerala, Indien",
    countryOfOrigin: "Indien",
    qualification: "Bachelor of Science (Nursing)",
    yearsOfExperience: "1 Jahre 6 Monate",
    languageProficiency: "Deutsch B2",
    startDate: "März 2027",
    photoUrl: "https://images.unsplash.com/photo-1594824813589-3221b65e90df?auto=format&fit=crop&w=400&q=80"
  },
  assessment: {
    title: "Einschätzung Rosy's German School",
    paragraphs: [
      "Frau Gopika Jayaram verfügt über rund eineinhalb Jahre Berufserfahrung als Pflegefachfrau im kardiologischen Bereich am Sree Gokulam Medical College.",
      "In ihrer bisherigen Tätigkeit lag ihr Schwerpunkt auf der Einschätzung und Beurteilung kardiologischer Patientinnen und Patienten, der pflegerischen Betreuung und Überwachung sowie der Verabreichung ärztlich verordneter Herzmedikamente. Darüber hinaus verfügt sie über praktische Erfahrung im Umgang mit für die kardiologische und akutmedizinische Versorgung relevanten Geräten, darunter EKG-Gerät, Herzmonitor, Pulsoxymeter, Defibrillator, Absauggerät sowie Spritzen- und Infusionspumpen. Auch im Umgang mit Notfallausrüstung wie Crash Cart und Ambu-Beutel sowie mit einem BiPAP-Gerät bringt sie praktische Erfahrung mit. Ihre fachliche Qualifikation wird durch einen Bachelor of Science in Nursing ergänzt.",
      "Zu ihren persönlichen Kompetenzen zählen unter anderem Verantwortungsbewusstsein, Problemlösungskompetenz, aktives Zuhören, Beobachtungsgabe, Empathie und Teamfähigkeit. Sprachlich verfügt Frau Jayaram über Deutschkenntnisse auf B2-Niveau sowie Englischkenntnisse auf B2-Niveau.",
      "Aus Sicht von Rosy's German School ist ihr Profil aufgrund ihrer bisherigen Tätigkeit insbesondere für den kardiologischen und akutmedizinischen Bereich interessant. Aufgrund ihrer noch vergleichsweise kurzen Berufserfahrung und der bislang fehlenden dokumentierten Berufserfahrung im deutschen Gesundheitswesen sollte für einen erfolgreichen Einstieg eine strukturierte Einarbeitung in die hiesigen pflegerischen Abläufe, Standards und Strukturen berücksichtigt werden."
    ]
  },
  experience: [
    {
      id: "exp-1",
      period: "09/2024 – 03/2026",
      role: "Pflegefachfrau, Kardiologie",
      facility: "bei Sree Gokulam Medical College in Venjaramoodu",
      tasks: [
        "Einschätzung und Beurteilung kardiologischer Patientinnen und Patienten",
        "Verabreichung ärztlich verordneter Herzmedikamente",
        "Pflegerische Betreuung und Überwachung kardiologischer Patientinnen und Patienten",
        "Vorbereitung und Assistenz bei diagnostischen und therapeutischen Herzmaßnahmen",
        "Dokumentation pflegerelevanter Daten im klinischen Informationssystem"
      ]
    }
  ],
  education: [
    {
      id: "edu-1",
      period: "06/2020 – 09/2024",
      degree: "Bachelor of Science in Krankenpflege",
      institution: "an Sree Gokulam Medical College"
    },
    {
      id: "edu-2",
      period: "06/2018 – 03/2020",
      degree: "Oberschule",
      institution: "an S N Trust HSS"
    },
    {
      id: "edu-3",
      period: "06/2016 – 03/2017",
      degree: "Mittelschule",
      institution: "an Sree Narayana Public School"
    }
  ],
  skills: {
    languages: [
      { language: "Deutsch", level: "B2" },
      { language: "Englisch", level: "B2" },
      { language: "Malayalam", level: "Muttersprache" },
      { language: "Tamil", level: "B1" }
    ],
    socialSkills: [
      "Führungs- und Verantwortungsbewusstsein",
      "Problemlösungskompetenz und aktives Zuhören",
      "Ausgeprägte Beobachtungsgabe und Empathie",
      "Teamfähigkeit und kooperative Zusammenarbeit"
    ],
    itSkills: [
      "Grundlegende Computerkenntnisse",
      "Krankenhausinformationssysteme (KIS)",
      "Digitale Pflegedokumentation"
    ],
    equipment: [
      "EKG-Gerät und Herzmonitor",
      "Pulsoxymeter",
      "Defibrillator und Notfallausrüstung (Crash Cart, Ambu-Beutel)",
      "Absauggerät",
      "Spritzen- und Infusionspumpe",
      "BiPAP-Gerät"
    ]
  }
};

export const alternativeProfiles = {
  icuNurse: {
    id: "sample-rahul-nair",
    name: "Rahul Nair - Intensivstation (ITS)",
    updatedAt: new Date().toISOString(),
    template: "rosys-modern",
    themeColor: "#0284c7",
    fontFamily: "Inter, sans-serif",
    institution: { ...initialRosysCvData.institution },
    personalData: {
      lastName: "Nair",
      firstName: "Rahul",
      dateOfBirth: "15.04.1998",
      placeOfBirth: "Ernakulam, Indien",
      countryOfOrigin: "Indien",
      qualification: "Bachelor of Science (Nursing) + Intensivkurs",
      yearsOfExperience: "3 Jahre 2 Monate",
      languageProficiency: "Deutsch B2 (TELC Medizin)",
      startDate: "Januar 2027",
      photoUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80"
    },
    assessment: {
      title: "Einschätzung Rosy's German School",
      paragraphs: [
        "Herr Rahul Nair verfügt über mehr als drei Jahre fundierte Berufserfahrung als Intensivpfleger am Aster Medcity Hospital in Kochi.",
        "In seiner klinischen Praxis betreute Herr Nair beatmete und hämodynamisch instabile Patientinnen und Patienten auf der interdisziplinären Intensivstation. Er beherrscht die Verabreichung von Notfallmedikamenten, das erweiterte Monitoring (Arterielle Druckmessung, ZVD) sowie den sicheren Umgang mit Notfallequipment wie Defibrillatoren und Perfusoren.",
        "Zu seinen herausragenden persönlichen Eigenschaften gehören emotionale Belastbarkeit, rasche Auffassungsgabe und teamorientierte Kommunikation. Sprachlich hat Herr Nair das B2-Niveau in Deutsch mit exzellenten Ergebnissen an der Rosy's German School abgeschlossen.",
        "Rosy's German School empfiehlt Herrn Nair uneingeschränkt für den Einsatz auf Intensivstationen und Intermediate-Care-Einheiten deutscher Schwerpunktkliniken."
      ]
    },
    experience: [
      {
        id: "exp-2",
        period: "04/2023 – Heute",
        role: "Pflegefachkraft für Intensivpflege",
        facility: "am Aster Medcity Hospital in Kochi",
        tasks: [
          "Überwachung und Pflege beatmeter und kreislaufinstabiler Patienten",
          "Bedienung und Monitoring von Beatmungsgeräten (BiPAP/CPAP, invasive Beatmung)",
          "Sichere Vorbereitung und Gabe von Katecholaminen und Infusionen",
          "Assistenz bei Bronchoskopien und ZVK-Anlagen",
          "Strukturierte Pflegedokumentation im klinischen Informationssystem"
        ]
      }
    ],
    education: [
      {
        id: "edu-4",
        period: "09/2018 – 09/2022",
        degree: "Bachelor of Science in Krankenpflege",
        institution: "an Amrita College of Nursing"
      },
      {
        id: "edu-5",
        period: "06/2016 – 03/2018",
        degree: "Höhere Sekundarschule (Naturwissenschaften)",
        institution: "an Bhavan's Vidya Mandir, Kochi"
      }
    ],
    skills: {
      languages: [
        { language: "Deutsch", level: "B2 (TELC)" },
        { language: "Englisch", level: "B2" },
        { language: "Malayalam", level: "Muttersprache" },
        { language: "Hindi", level: "B1" }
      ],
      socialSkills: [
        "Hohe psychische und physische Belastbarkeit",
        "Entscheidungsstärke und schnelles Handeln in Notfällen",
        "Empathischer Umgang mit Angehörigen",
        "Exzellente Team- und interdisziplinäre Kooperation"
      ],
      itSkills: [
        "Krankenhausinformationssysteme (KIS / Epic / SAP)",
        "Digitale Vitaldaten- und Kurvenführung",
        "MS Office und digitale Lernplattformen"
      ],
      equipment: [
        "Beatmungsgeräte (Hamilton / Dräger)",
        "Patientenmonitore (Philips IntelliVue)",
        "Spritzenpumpen (B. Braun Perfusor)",
        "Defibrillator und Crash Cart",
        "Blutgasanalyse-Geräte (BGA)",
        "Absauganlagen und Trachealkanülen"
      ]
    }
  }
};
