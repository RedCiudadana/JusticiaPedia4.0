import { CandidateData } from '../types';
import csvData from './justiciapedia.csv?raw';
import { parseCSV } from '../utils/csvParser';

export const candidates: CandidateData[] = parseCSV(csvData);
