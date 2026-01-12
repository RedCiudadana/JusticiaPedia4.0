import csvData from '../data/justiciapedia.csv?raw';
import { parseCSVLine } from './csvParser';

export function extractInstitutions(): string[] {
  const lines = csvData.split('\n').filter(line => line.trim());
  if (lines.length === 0) return [];

  const headers = parseCSVLine(lines[0]);
  const institutionIndex = headers.indexOf('seleccionarInstitución');

  if (institutionIndex === -1) return [];

  const institutions = new Set<string>();

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const institution = values[institutionIndex];
    if (institution && institution.trim() && institution !== 'Yes') {
      institutions.add(institution.trim());
    }
  }

  return Array.from(institutions).sort();
}

export function extractCommissions(): string[] {
  const lines = csvData.split('\n').filter(line => line.trim());
  if (lines.length === 0) return [];

  const headers = parseCSVLine(lines[0]);
  const commissionIndex = headers.indexOf('seleccionarComisión');

  if (commissionIndex === -1) return [];

  const commissions = new Set<string>();

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const commission = values[commissionIndex];
    if (commission && commission.trim() && commission !== 'Yes') {
      commissions.add(commission.trim());
    }
  }

  return Array.from(commissions).sort();
}

export function extractElections(): string[] {
  const lines = csvData.split('\n').filter(line => line.trim());
  if (lines.length === 0) return [];

  const headers = parseCSVLine(lines[0]);
  const electionIndex = headers.indexOf('seleccionarElección');

  if (electionIndex === -1) return [];

  const elections = new Set<string>();

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const election = values[electionIndex];
    if (election && election.trim() && election !== 'Yes') {
      elections.add(election.trim());
    }
  }

  return Array.from(elections).sort();
}
