import { CandidateData } from '../types';

export function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"' && nextChar === '"') {
      current += '"';
      i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

export function parseCSV(csvContent: string): CandidateData[] {
  const lines = csvContent.split('\n').filter(line => line.trim());
  if (lines.length === 0) return [];

  const headers = parseCSVLine(lines[0]);
  const candidates: CandidateData[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length < headers.length) continue;

    const row: Record<string, string> = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });

    const experienciaText = row.experienciaProfesional || '';
    let experienceArray = experienciaText.split(/\s*\|\s*/).map(exp => exp.trim()).filter(exp => exp);
    if (experienceArray.length <= 1) {
      experienceArray = experienciaText.split(/\.\s+/).map(exp => exp.trim()).filter(exp => exp);
    }
    const experienceArrayMapped = experienceArray.map(exp => ({
      position: exp.split('-')[0]?.trim() || exp.trim(),
      institution: row.dependencia || row.institution || '',
      period: '',
      description: exp.trim()
    }));

    const candidate: CandidateData = {
      id: row.id || `candidate-${i}`,
      name: row.nombre || '',
      role: row.puesto || 'Aspirante',
      institution: row.institution || row.seleccionarInstitución || '',
      imageUrl: row.fotoURL || 'https://images.pexels.com/photos/5669619/pexels-photo-5669619.jpeg',
      description: row.resumen || row.proyeccionHumana || '',
      status: (row.estado === 'Activo' ? 'Activo' : row.estado === 'Inactivo' ? 'Inactivo' : 'Activo') as 'Activo' | 'Inactivo' | 'Retirado',
      commissionId: row.comission || row.seleccionarComisión || '',
      specialization: row.profesion || '',
      yearsOfExperience: parseInt(row.anosexperiencia) || 0,
      education: row.experienciaAcademica ? row.experienciaAcademica.split('|').map(edu => edu.trim()).filter(edu => edu).map(edu => {
        const parts = edu.split(',');
        return {
          institution: parts.slice(1).join(',').trim() || '',
          degree: parts[0].trim() || '',
          year: '',
          honors: ''
        };
      }) : [],
      experience: experienceArrayMapped.length > 0 ? experienceArrayMapped : [{
        position: row.puesto || '',
        institution: row.dependencia || row.institution || '',
        period: '',
        description: row.experienciaProfesional || ''
      }],
      publications: [],
      awards: [],
      languages: [],
      certifications: [],
      socialMedia: {},
      candidateNumber: row.no || '',
      gender: row.sexo || '',
      department: row.departamento || '',
      workStartDate: row.fechalaboral || '',
      barAssociationNumber: row.nocolegiado || '',
      maritalStatus: row.estadocivil || '',
      profession: row.profesion || '',
      yearsOfExperienceText: row.anosexperiencia || '',
      professionalExperience: row.experienciaProfesional || '',
      academicExperience: row.experienciaAcademica || '',
      humanProjection: row.proyeccionHumana || '',
      sourceText: row.fuenteTexto || '',
      sourceUrl: row.fuenteURL || '',
      cvUrl: row.cv || '',
      fileUrl: row.expediente || '',
      summary: row.resumen || '',
      commission: row.comission || row.seleccionarComisión || '',
      election: row.election || row.seleccionarElección || ''
    };

    candidates.push(candidate);
  }

  return candidates;
}
