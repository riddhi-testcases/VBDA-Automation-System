import Papa from 'papaparse';
import { Recipient } from '../types';
import { generateId } from './mockData';

interface CsvRow {
  FirstName: string;
  LastName: string;
  Email: string;
  Organization: string;
  Role: string;
  Achievement: string;
  Source?: string;
  [key: string]: string | undefined;
}

export const parseCSV = (file: File): Promise<Recipient[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const recipients: Recipient[] = (results.data as CsvRow[]).map((row) => ({
            id: generateId(),
            firstName: row.FirstName || '',
            lastName: row.LastName || '',
            email: row.Email || '',
            organization: row.Organization || '',
            role: row.Role || '',
            achievement: row.Achievement || '',
            source: row.Source,
            status: 'no-response',
            lastContactDate: undefined,
            emailOpened: false,
            emailClicked: false
          }));
          
          resolve(recipients);
        } catch (error) {
          reject(new Error('Error parsing CSV: Invalid format'));
        }
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};

export const generateCSVTemplate = (): string => {
  const headers = ['FirstName', 'LastName', 'Email', 'Organization', 'Role', 'Achievement', 'Source'];
  const csvContent = headers.join(',') + '\n';
  return csvContent;
};