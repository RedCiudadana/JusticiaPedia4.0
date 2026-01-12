import { CommissionData } from '../types';
import csvData from './comisiones.csv?raw';
import { parseCommissionsCSV } from '../utils/commissionParser';

export const commissions: CommissionData[] = parseCommissionsCSV(csvData);
