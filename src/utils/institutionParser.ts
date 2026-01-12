import { InstitutionData } from '../types';
import { parseCSVLine } from './csvParser';

export function parseInstitutionsCSV(csvContent: string): InstitutionData[] {
  const lines = csvContent.split('\n').filter(line => line.trim());
  if (lines.length === 0) return [];

  const headers = parseCSVLine(lines[0]);
  const institutions: InstitutionData[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length < headers.length) continue;

    const row: Record<string, string> = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });

    const institution: InstitutionData = {
      id: `institution-${row.id}`,
      name: row.nombre || '',
      type: row.sector || 'Institución',
      description: row.descripcion || '',
      imageUrl: row.fotoURL || 'https://images.pexels.com/photos/8422403/pexels-photo-8422403.jpeg',
      schedule: row.horario || '',
      workDays: row.diasAtencion || '',
      website: row.web || '',
      email: row.correo || '',
      phone: row.telefono || '',
      address: row.direccion || '',
      mission: row.mision || '',
      vision: row.vision || '',
      sector: row.sector || '',
      enlaceAccesoInformacion: row.enlaceAccesoInformacion || '',
      enlaceGobiernoDigital: row.enlaceGobiernoDigital || '',
      enlaceDatosAbiertos: row.enlaceDatosAbiertos || '',
      enlaceServicios: row.enlaceServicios || '',
      enlaceServicios2: row.enlaceServicios2 || '',
      fb: row.fb || '',
      tw: row.tw || '',
      authorities: [],
      budget: []
    };

    institutions.push(institution);
  }

  return institutions;
}
