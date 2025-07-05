
import { useState, useCallback } from 'react';
import { Upload, FileSpreadsheet, AlertCircle, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { parseSpreadsheet, SpreadsheetData } from '@/lib/parseSpreadsheet';

interface FileUploaderProps {
  onFileSelect: (file: File, data: SpreadsheetData) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(async (file: File) => {
    setError(null);
    setIsLoading(true);

    try {
      const data = await parseSpreadsheet(file);
      console.log('Parsed data:', data);
      onFileSelect(file, data);
    } catch (err) {
      console.error('Error parsing file:', err);
      setError(`Failed to parse file: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  }, [onFileSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const spreadsheetFile = files.find(file => 
      file.type.includes('spreadsheet') || 
      file.type.includes('csv') || 
      file.name.endsWith('.xlsx') ||
      file.name.endsWith('.xls') ||
      file.name.endsWith('.csv') ||
      file.name.endsWith('.ods')
    );

    if (spreadsheetFile) {
      handleFile(spreadsheetFile);
    } else {
      setError('Please upload a valid spreadsheet file (.xlsx, .csv, or .ods)');
    }
  }, [handleFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  return (
    <div className="w-full">
      <div
        className={`
          relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-500 transform
          ${isDragging 
            ? 'border-cyan-400 bg-cyan-400/10 scale-105 shadow-2xl shadow-cyan-500/25' 
            : 'border-white/30 hover:border-white/50 hover:scale-102'
          }
          ${isLoading ? 'opacity-50 pointer-events-none' : ''}
          backdrop-blur-sm bg-white/5
        `}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 transition-opacity duration-500 ${isDragging ? 'opacity-100' : 'opacity-0'}`}></div>
        </div>

        <div className="relative z-10 flex flex-col items-center space-y-8">
          <div className={`relative p-6 rounded-full transition-all duration-500 ${isDragging ? 'bg-cyan-400/20 scale-110' : 'bg-white/10'}`}>
            {isLoading ? (
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-400 border-t-transparent"></div>
                <Zap className="absolute inset-0 m-auto h-8 w-8 text-cyan-400 animate-pulse" />
              </div>
            ) : (
              <div className="relative">
                <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-xl opacity-50 ${isDragging ? 'animate-pulse' : ''}`}></div>
                <FileSpreadsheet className={`relative h-16 w-16 ${isDragging ? 'text-cyan-400 animate-bounce' : 'text-white'} transition-colors duration-300`} />
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Sparkles className="h-6 w-6 animate-spin" />
                  Processing Magic...
                </span>
              ) : (
                'Upload Spreadsheet'
              )}
            </h3>
            <p className="text-white/70 text-lg mb-6">
              Drag and drop your file here, or click to browse
            </p>
            <p className="text-sm text-white/50">
              Supports .xlsx, .csv, and .ods files
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => document.getElementById('file-input')?.click()}
              disabled={isLoading}
              className="relative group bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg rounded-2xl shadow-xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative flex items-center">
                <Upload className="h-5 w-5 mr-3" />
                Choose File
                <Sparkles className="h-4 w-4 ml-3 animate-pulse" />
              </div>
            </Button>
            
            <input
              id="file-input"
              type="file"
              accept=".xlsx,.xls,.csv,.ods"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {error && (
        <Alert className="mt-6 border-red-400/50 bg-red-500/10 backdrop-blur-sm rounded-2xl">
          <AlertCircle className="h-5 w-5 text-red-400" />
          <AlertDescription className="text-red-300 text-base">
            {error}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default FileUploader;
