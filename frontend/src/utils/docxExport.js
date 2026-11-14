import { saveAs } from 'file-saver';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  Header,
  Footer,
  PageNumber
} from 'docx';

export async function downloadCvDocx(resumeData) {
  try {
    // 1. Try server-side generation
    const res = await fetch('/api/export-docx', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resumeData)
    });

    if (res.ok) {
      const blob = await res.blob();
      const lastName = (resumeData.personalData?.lastName || 'Kandidat').replace(/[^a-zA-Z0-9_-]/g, '_');
      saveAs(blob, `Lebenslauf_Rosys_${lastName}.docx`);
      return { success: true, method: 'server' };
    }
  } catch (err) {
    console.warn('Backend DOCX export failed, falling back to client-side docx generation', err);
  }

  // 2. Client-side fallback using docx library in browser
  return generateClientDocx(resumeData);
}

function generateClientDocx(data) {
  const p = data.personalData || {};
  const inst = data.institution || {};
  const assessment = data.assessment || {};
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || {};
  const themeColor = data.themeColor === '#18181b' || !data.themeColor ? '18181B' : data.themeColor.replace('#', '');
  const accentRed = 'DC2626';

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 720, bottom: 720, left: 900, right: 900 }
          }
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: `${inst.name || "Rosy's German School"} • German Linguist Since 1971`,
                    size: 16,
                    color: '888888',
                    font: 'Calibri'
                  })
                ]
              })
            ]
          })
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: `${inst.name || "Rosy's German School"}, ${inst.address || "Edappally, Kochi"} | Tel: ${inst.phone || "+91 8921438879"} | ${inst.email || "rosysgermanschool@gmail.com"} — Seite `,
                    size: 16,
                    color: '666666',
                    font: 'Calibri'
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    size: 16,
                    color: '666666',
                    bold: true,
                    font: 'Calibri'
                  })
                ]
              })
            ]
          })
        },
        children: [
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.SINGLE, size: 12, color: accentRed },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              insideHorizontal: { style: BorderStyle.NONE },
              insideVertical: { style: BorderStyle.NONE }
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 45, type: WidthType.PERCENTAGE },
                    shading: { fill: themeColor },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: 'LEBENSLAUF',
                            bold: true,
                            size: 28,
                            color: 'FFFFFF',
                            font: 'Arial'
                          })
                        ]
                      })
                    ]
                  }),
                  new TableCell({
                    width: { size: 55, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        children: [
                          new TextRun({
                            text: inst.name || "Rosy's German School",
                            bold: true,
                            size: 22,
                            color: '111111',
                            font: 'Arial'
                          }),
                          new TextRun({
                            text: '\nGerman Linguist Since 1971 • Healthcare Placements',
                            size: 16,
                            color: '555555',
                            font: 'Calibri'
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { after: 200 } }),

          // Section 1: Persönliche Daten
          createHeaderPara('Persönliche Daten', themeColor),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
              insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE }
            },
            rows: [
              createRow('Nachname, Vorname:', `${p.lastName || ''}, ${p.firstName || ''}`),
              createRow('Geburtstag/-ort:', `${p.dateOfBirth || ''}${p.placeOfBirth ? ', ' + p.placeOfBirth : ''}`),
              createRow('Herkunftsland:', p.countryOfOrigin || 'Indien'),
              createRow('Ausbildung:', p.qualification || 'Bachelor of Science (Nursing)'),
              createRow('Berufserfahrung in Jahren:', p.yearsOfExperience || '1 Jahre 6 Monate'),
              createRow('Sprachkenntnisse:', p.languageProficiency || 'Deutsch B2', true),
              createRow('Arbeitsbeginn:', p.startDate || 'März 2027')
            ]
          }),

          new Paragraph({ spacing: { after: 240 } }),

          // Section 2: Einschätzung
          createHeaderPara(assessment.title || "Einschätzung Rosy's German School", themeColor),
          ...(assessment.paragraphs || []).map(para => (
            new Paragraph({
              spacing: { after: 120, line: 276 },
              alignment: AlignmentType.JUSTIFIED,
              children: [new TextRun({ text: para, size: 20, font: 'Calibri', color: '333333' })]
            })
          )),

          new Paragraph({ spacing: { after: 200 } }),

          // Section 3: Berufliche Erfahrung
          createHeaderPara('Berufliche Erfahrung', themeColor),
          ...(experience || []).flatMap(exp => [
            new Paragraph({
              spacing: { before: 80, after: 40 },
              children: [
                new TextRun({ text: `${exp.period || ''}   `, bold: true, size: 20, font: 'Arial' }),
                new TextRun({ text: exp.role || '', bold: true, size: 20, color: accentRed, font: 'Arial' }),
                new TextRun({ text: ` — ${exp.facility || ''}`, size: 20, color: '444444', font: 'Calibri' })
              ]
            }),
            ...(exp.tasks || []).map(t => (
              new Paragraph({
                bullet: { level: 0 },
                spacing: { after: 30 },
                children: [new TextRun({ text: t, size: 19, color: '333333', font: 'Calibri' })]
              })
            ))
          ]),

          new Paragraph({ spacing: { after: 200 } }),

          // Section 4: Ausbildung
          createHeaderPara('Ausbildung', themeColor),
          ...(education || []).map(edu => (
            new Paragraph({
              spacing: { after: 80 },
              children: [
                new TextRun({ text: `${edu.period || ''}   `, bold: true, size: 20, font: 'Arial' }),
                new TextRun({ text: edu.degree || '', bold: true, size: 20, font: 'Arial' }),
                new TextRun({ text: ` — ${edu.institution || ''}`, size: 20, color: '555555', font: 'Calibri' })
              ]
            })
          )),

          new Paragraph({ spacing: { after: 200 } }),

          // Section 5: Kenntnisse und Kompetenzen
          createHeaderPara('Kenntnisse und Kompetenzen', themeColor),
          new Paragraph({
            children: [
              new TextRun({ text: 'Sprachkenntnisse: ', bold: true, size: 20, font: 'Arial' }),
              new TextRun({
                text: (skills.languages || []).map(l => `${l.language} (${l.level})`).join(' • '),
                size: 20,
                font: 'Calibri'
              })
            ]
          }),
          new Paragraph({
            spacing: { before: 80 },
            children: [
              new TextRun({ text: 'Soziale Kompetenzen: ', bold: true, size: 20, font: 'Arial' }),
              new TextRun({
                text: (skills.socialSkills || []).join(' • '),
                size: 20,
                font: 'Calibri'
              })
            ]
          }),
          new Paragraph({
            spacing: { before: 80 },
            children: [
              new TextRun({ text: 'Am Arbeitsplatz verwendete Geräte: ', bold: true, size: 20, font: 'Arial' }),
              new TextRun({
                text: (skills.equipment || []).join(', '),
                size: 20,
                font: 'Calibri'
              })
            ]
          })
        ]
      }
    ]
  });

  return Packer.toBlob(doc).then(blob => {
    const lastName = (data.personalData?.lastName || 'Kandidat').replace(/[^a-zA-Z0-9_-]/g, '_');
    saveAs(blob, `Lebenslauf_Rosys_${lastName}.docx`);
    return { success: true, method: 'client' };
  });
}

function createHeaderPara(title, colorHex) {
  return new Paragraph({
    spacing: { before: 180, after: 100 },
    children: [
      new TextRun({ text: '▍ ', bold: true, size: 24, color: 'DC2626', font: 'Arial' }),
      new TextRun({ text: title.toUpperCase(), bold: true, size: 22, color: colorHex || '18181B', font: 'Arial' })
    ]
  });
}

function createRow(label, value, isBold = false) {
  return new TableRow({
    children: [
      new TableCell({
        width: { size: 35, type: WidthType.PERCENTAGE },
        children: [
          new Paragraph({
            children: [new TextRun({ text: label, bold: true, size: 20, font: 'Arial' })]
          })
        ]
      }),
      new TableCell({
        width: { size: 65, type: WidthType.PERCENTAGE },
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: value,
                bold: isBold,
                size: 20,
                font: 'Calibri',
                color: isBold ? 'DC2626' : '333333'
              })
            ]
          })
        ]
      })
    ]
  });
}
