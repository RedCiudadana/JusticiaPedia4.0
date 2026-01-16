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

function parseCSVRows(csvContent: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < csvContent.length; i++) {
    const char = csvContent[i];
    const nextChar = csvContent[i + 1];

    if (char === '"' && nextChar === '"') {
      current += '"';
      i++;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      row.push(current.trim());
      if (row.some(cell => cell !== '')) {
        rows.push(row);
      }
      row = [];
      current = '';
      continue;
    }

    if (char === ',' && !inQuotes) {
      row.push(current.trim());
      current = '';
      continue;
    }

    current += char;
  }

  row.push(current.trim());
  if (row.some(cell => cell !== '')) {
    rows.push(row);
  }

  return rows;
}

export function parseCSV(csvContent: string): CandidateData[] {
  const rows = parseCSVRows(csvContent);
  if (rows.length === 0) return [];

  const headers = rows[0];
  const candidates: CandidateData[] = [];

  for (let i = 1; i < rows.length; i++) {
    const values = rows[i];
    if (values.length < headers.length) continue;

    const row: Record<string, string> = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });

    const pickPreferred = (...values: Array<string | undefined>) => {
      return values.find(value => {
        if (!value) return false;
        const trimmed = value.trim();
        return trimmed !== '' && trimmed.toLowerCase() !== 'yes';
      }) || '';
    };
    const isMeaningfulValue = (value?: string) => {
      if (!value) return false;
      const trimmed = value.trim();
      return trimmed !== '' && trimmed.toLowerCase() !== 'yes';
    };

    const selectedInstitution = pickPreferred(
      row.seleccionarInstitucion,
      row.seleccionInstitucion,
      row.institution,
      row.dependencia
    );

    const selectedCommission = pickPreferred(
      row.seleccionarComision,
      row.seleccionarComission,
      row.seleccionComision,
      row.seleccionComission,
      row.comission
    );

    const selectedElection = pickPreferred(
      row.seleccionarEleccion,
      row.seleccionEleccion,
      row.election
    );

    const experienciaText = isMeaningfulValue(row.experienciaProfesional) ? row.experienciaProfesional : '';
    let experienceArray = experienciaText.split(/\s*\|\s*/).map(exp => exp.trim()).filter(exp => exp);
    if (experienceArray.length <= 1) {
      experienceArray = experienciaText.split(/\.\s+/).map(exp => exp.trim()).filter(exp => exp);
    }
    const experienceArrayMapped = experienceArray.map(exp => ({
      position: exp.split('-')[0]?.trim() || exp.trim(),
      institution: selectedInstitution || row.dependencia || row.institution || '',
      period: '',
      description: exp.trim()
    }));
    const fallbackExperience = {
      position: row.puesto || '',
      institution: selectedInstitution || row.dependencia || row.institution || '',
      period: '',
      description: row.experienciaProfesional || ''
    };
    const hasFallbackExperience = [
      fallbackExperience.position,
      fallbackExperience.institution,
      fallbackExperience.description
    ].some(isMeaningfulValue);

    const candidate: CandidateData = {
      id: row.id || `candidate-${i}`,
      name: row.nombre || '',
      role: row.puesto || 'Aspirante',
      institution: selectedInstitution || row.dependencia || (row.institution !== 'Yes' ? row.institution : '') || '',
      imageUrl: row.fotoURL || 'https://images.pexels.com/photos/5669619/pexels-photo-5669619.jpeg',
      description: row.resumen || row.proyeccionHumana || '',
      status: (row.estado === 'Activo' ? 'Activo' : row.estado === 'Inactivo' ? 'Inactivo' : 'Activo') as 'Activo' | 'Inactivo' | 'Retirado',
      commissionId: selectedCommission || '',
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
      experience: experienceArrayMapped.length > 0 ? experienceArrayMapped : (hasFallbackExperience ? [fallbackExperience] : []),
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
      commission: selectedCommission || '',
      election: selectedElection || ''
    };

    candidates.push(candidate);
  }

  return candidates;
}
