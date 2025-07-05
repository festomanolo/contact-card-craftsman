
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Users, AlertTriangle, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SpreadsheetTable from '@/components/SpreadsheetTable';
import ColumnMapper from '@/components/ColumnMapper';
import AnalysisResults from '@/components/AnalysisResults';
import ExportOptions from '@/components/ExportOptions';

const Analyze = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('preview');
  const [columnMapping, setColumnMapping] = useState<Record<string, string>>({});
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  const { file, data } = location.state || {};

  useEffect(() => {
    if (!file || !data) {
      navigate('/');
    }
  }, [file, data, navigate]);

  if (!file || !data) {
    return null;
  }

  const handleMappingChange = (mapping: Record<string, string>) => {
    setColumnMapping(mapping);
  };

  const handleAnalysisComplete = (results: any) => {
    setAnalysisResults(results);
    setActiveTab('analysis');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  {file.name}
                </h1>
                <p className="text-sm text-gray-500">
                  {data.totalRows} rows • {data.headers.length} columns
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveTab('export')}
                className="bg-white/50"
              >
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="preview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Preview</span>
            </TabsTrigger>
            <TabsTrigger value="mapping" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Mapping</span>
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden sm:inline">Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="export" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="space-y-6">
            <Card className="bg-white/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Data Preview</CardTitle>
                <CardDescription>
                  Review your spreadsheet data and column headers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SpreadsheetTable data={data} maxRows={10} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mapping" className="space-y-6">
            <Card className="bg-white/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Column Mapping</CardTitle>
                <CardDescription>
                  Map your columns to standard fields for contact generation and analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ColumnMapper
                  headers={data.headers}
                  data={data.rows}
                  onMappingChange={handleMappingChange}
                  onAnalysisComplete={handleAnalysisComplete}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            {analysisResults ? (
              <AnalysisResults results={analysisResults} />
            ) : (
              <Card className="bg-white/50 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No Analysis Yet
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Please complete the column mapping first to see analysis results.
                  </p>
                  <Button onClick={() => setActiveTab('mapping')}>
                    Go to Mapping
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="export" className="space-y-6">
            <ExportOptions
              data={data}
              columnMapping={columnMapping}
              analysisResults={analysisResults}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analyze;
