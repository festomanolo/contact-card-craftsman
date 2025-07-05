
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

export interface SpreadsheetData {
  headers: string[];
  rows: any[];
  totalRows: number;
  fileName: string;
}

export const parseSpreadsheet = async (file: File): Promise<SpreadsheetData> => {
  const fileName = file.name;
  const fileExtension = fileName.split('.').pop()?.toLowerCase();

  console.log('Parsing file:', fileName, 'Extension:', fileExtension);

  try {
    if (fileExtension === 'csv') {
      return await parseCSV(file);
    } else if (['xlsx', 'xls', 'ods'].includes(fileExtension || '')) {
      return await parseExcel(file);
    } else {
      throw new Error('Unsupported file format. Please use .xlsx, .csv, or .ods files.');
    }
  } catch (error) {
    console.error('Error parsing spreadsheet:', error);
    throw new Error(`Failed to parse ${fileName}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

const parseCSV = (file: File): Promise<SpreadsheetData> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: false,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const data = results.data as string[][];
          if (data.length === 0) {
            throw new Error('CSV file is empty');
          }

          const headers = data[0];
          const rows = data.slice(1).map(row => {
            const obj: any = {};
            headers.forEach((header, index) => {
              obj[header] = row[index] || '';
            });
            return obj;
          });

          resolve({
            headers,
            rows,
            totalRows: rows.length,
            fileName: file.name
          });
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => {
        reject(new Error(`CSV parsing error: ${error.message}`));
      }
    });
  });
};

const parseExcel = async (file: File): Promise<SpreadsheetData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Get the first worksheet
        const sheetName = workbook.SheetNames[0];
        if (!sheetName) {
          throw new Error('No worksheets found in the file');
        }
        
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
        
        if (jsonData.length === 0) {
          throw new Error('Worksheet is empty');
        }

        const headers = jsonData[0]?.map(header => String(header || '')).filter(h => h) || [];
        const rows = jsonData.slice(1)
          .filter(row => row.some(cell => cell !== undefined && cell !== ''))
          .map(row => {
            const obj: any = {};
            headers.forEach((header, index) => {
              obj[header] = row[index] !== undefined ? String(row[index]) : '';
            });
            return obj;
          });

        resolve({
          headers,
          rows,
          totalRows: rows.length,
          fileName: file.name
        });
      } catch (error) {
        reject(new Error(`Excel parsing error: ${error instanceof Error ? error.message : 'Unknown error'}`));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsArrayBuffer(file);
  });
};

// Helper functions for data analysis
export const detectDuplicates = (data: any[], key: string): any[] => {
  const seen = new Set();
  return data.filter(item => {
    const value = item[key]?.toString().toLowerCase().trim();
    if (!value || seen.has(value)) {
      return true; // Include duplicates
    }
    seen.add(value);
    return false;
  });
};

export const groupByColumn = (data: any[], column: string): Record<string, any[]> => {
  return data.reduce((groups, item) => {
    const key = item[column]?.toString().trim() || 'Unknown';
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {} as Record<string, any[]>);
};

export const findMissingData = (data: any[], requiredFields: string[]): any[] => {
  return data.filter(item => 
    requiredFields.some(field => !item[field] || !item[field].toString().trim())
  );
};
