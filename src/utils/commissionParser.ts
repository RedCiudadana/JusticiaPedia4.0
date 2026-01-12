import { CommissionData } from '../types';
import { parseCSVLine } from './csvParser';

export function parseCommissionsCSV(csvContent: string): CommissionData[] {
  const lines = csvContent.split('\n').filter(line => line.trim());
  if (lines.length === 0) return [];

  const headers = parseCSVLine(lines[0]);
  const commissions: CommissionData[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length < headers.length) continue;

    const row: Record<string, string> = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });

    const requirements = row.requisitos ? row.requisitos.split(';').map(r => r.trim()).filter(r => r) : [];
    const members = row.comision ? row.comision.split(';').map(m => ({
      name: m.trim(),
      role: 'Miembro',
      institution: m.trim()
    })) : [];

    const documents: any[] = [];
    if (row.infografiaURL) {
      documents.push({
        title: 'Infografía',
        url: row.infografiaURL,
        type: 'Infografía'
      });
    }
    if (row.cronogramaURL) {
      documents.push({
        title: 'Cronograma',
        url: row.cronogramaURL,
        type: 'Cronograma'
      });
    }

    const commission: CommissionData = {
      id: row.id || `commission-${i}`,
      name: row.nombre || '',
      purpose: `Selección de candidatos para ${row.institution || ''}`,
      description: row.descripcion || '',
      type: row.institution || '',
      status: 'En proceso' as const,
      members: members,
      startDate: row.fechaEleccion || '',
      endDate: row.fechaEleccionProyectada || '',
      phases: [
        {
          name: 'Convocatoria',
          description: 'Publicación de bases del concurso',
          startDate: row.fechaEleccion || '',
          endDate: '',
          status: 'Completada' as const
        }
      ],
      candidatesCount: 0,
      positionsAvailable: 1,
      requirements: requirements,
      documents: documents,
      institution: row.institution || '',
      infografiaURL: row.infografiaURL || '',
      cronogramaURL: row.cronogramaURL || '',
      fotoURL: row.fotoURL || 'https://images.pexels.com/photos/5669619/pexels-photo-5669619.jpeg'
    };

    commissions.push(commission);
  }

  return commissions;
}
