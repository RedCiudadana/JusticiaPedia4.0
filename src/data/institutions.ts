import { InstitutionData } from '../types';
import csvData from './instituciones.csv?raw';
import { parseInstitutionsCSV } from '../utils/institutionParser';

export const institutions: InstitutionData[] = parseInstitutionsCSV(csvData);
