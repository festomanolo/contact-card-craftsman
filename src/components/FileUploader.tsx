
import { useState, useCallback } from 'react';
import { Upload, FileSpreadsheet, AlertCircle, Sparkles, Zap, Layers, Cpu } from 'lucide-react';
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
          relative glass-card liquid-gradient p-16 text-center transition-all duration-500 transform hover-glass
          ${isDragging 
            ? 'scale-105 border-cyan-400/50' 
            : 'hover:scale-102'
          }
          ${isLoading ? 'opacity-50 pointer-events-none' : ''}
        `}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
      >
        {/* Animated Background Effects */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <div className={`absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-500/20 transition-opacity duration-500 ${isDragging ? 'opacity-100' : 'opacity-0'}`}></div>
          
          {/* Floating Elements */}
          <div className="absolute top-4 right-4">
            <Layers className="h-8 w-8 text-white/30 animate-float-gentle" />
          </div>
          <div className="absolute bottom-4 left-4">
            <Cpu className="h-6 w-6 text-white/20 animate-pulse-smooth" />
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center space-y-10">
          <div className={`relative transition-all duration-500 ${isDragging ? 'scale-110' : ''}`}>
            {isLoading ? (
              <div className="relative glass-card p-8 rounded-full">
                <div className="absolute inset-0 rounded-full">
                  <div className="w-20 h-20 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div>
                </div>
                <Zap className="relative h-10 w-10 text-cyan-400 animate-pulse-smooth mx-auto" />
              </div>
            ) : (
              <div className="relative glass-card p-8 rounded-full">
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 blur-2xl opacity-40 ${isDragging ? 'animate-pulse-smooth' : ''}`}></div>
                <FileSpreadsheet className={`relative h-20 w-20 ${isDragging ? 'text-cyan-300 animate-bounce' : 'text-white'} transition-all duration-300`} />
              </div>
            )}
          </div>
          
          <div className="space-y-6 text-center">
            <h3 className="text-3xl font-bold text-white">
              {isLoading ? (
                <span className="flex items-center gap-3 liquid-text">
                  <Sparkles className="h-8 w-8 animate-spin" />
                  Processing Magic...
                </span>
              ) : (
                <span className="liquid-text">Upload Spreadsheet</span>
              )}
            </h3>
            <p className="text-white/80 text-xl leading-relaxed max-w-md">
              Drag and drop your file here, or click to browse
            </p>
            <p className="text-white/60 text-lg">
              Supports .xlsx, .csv, and .ods files
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <Button
              onClick={() => document.getElementById('file-input')?.click()}
              disabled={isLoading}
              className="btn-liquid text-white border-0 px-10 py-4 text-xl rounded-3xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="flex items-center relative z-10">
                <Upload className="h-6 w-6 mr-4" />
                Choose File
                <Sparkles className="h-5 w-5 ml-4 animate-pulse-smooth" />
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
        <div className="mt-8 animate-slide-up">
          <Alert className="glass-card border-red-400/50 p-6 rounded-2xl">
            <AlertCircle className="h-6 w-6 text-red-400" />
            <AlertDescription className="text-red-300 text-lg ml-3">
              {error}
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
