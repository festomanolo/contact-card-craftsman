
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

export const exportToCSV = (data: any[], filename: string = 'export.csv') => {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  downloadBlob(blob, filename);
};

export const exportToExcel = (data: any[], filename: string = 'export.xlsx') => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, filename);
};

export const exportToJSON = (data: any[], filename: string = 'export.json') => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
  downloadBlob(blob, filename);
};

const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Capacitor-specific sharing (for mobile)
export const shareFile = async (content: string, filename: string, mimeType: string) => {
  try {
    // Try using Capacitor Share API if available
    if (window.Capacitor) {
      const { Share } = await import('@capacitor/share');
      await Share.share({
        title: 'Exported Data',
        text: `Sharing ${filename}`,
        url: `data:${mimeType};base64,${btoa(content)}`,
      });
    } else {
      // Fallback to regular download
      const blob = new Blob([content], { type: mimeType });
      downloadBlob(blob, filename);
    }
  } catch (error) {
    console.error('Error sharing file:', error);
    // Fallback to download
    const blob = new Blob([content], { type: mimeType });
    downloadBlob(blob, filename);
  }
};
