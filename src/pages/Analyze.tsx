
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Users, AlertTriangle, BarChart3, Sparkles, Zap, Star } from 'lucide-react';
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

  const tabIcons = {
    preview: BarChart3,
    mapping: Users,
    analysis: AlertTriangle,
    export: Download
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-r from-pink-500/10 via-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 backdrop-blur-xl bg-white/5 border-b border-white/10 sticky top-0">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="text-white hover:bg-white/10 transition-all duration-300 hover:scale-105 rounded-xl"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-cyan-400 animate-pulse" />
                  {file.name}
                </h1>
                <p className="text-sm text-white/60">
                  {data.totalRows} rows • {data.headers.length} columns
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveTab('export')}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 rounded-xl"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2">
            {Object.entries(tabIcons).map(([key, Icon]) => (
              <TabsTrigger 
                key={key}
                value={key} 
                className="flex items-center space-x-2 text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline capitalize">{key}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="preview" className="space-y-8 animate-fade-in">
            <Card className="border-0 bg-white/5 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="text-white text-2xl flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  Data Preview
                </CardTitle>
                <CardDescription className="text-white/70 text-lg">
                  Review your spreadsheet data and column headers
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <SpreadsheetTable data={data} maxRows={10} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mapping" className="space-y-8 animate-fade-in">
            <Card className="border-0 bg-white/5 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-cyan-500/5"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="text-white text-2xl flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  Column Mapping
                </CardTitle>
                <CardDescription className="text-white/70 text-lg">
                  Map your columns to standard fields for contact generation and analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <ColumnMapper
                  headers={data.headers}
                  data={data.rows}
                  onMappingChange={handleMappingChange}
                  onAnalysisComplete={handleAnalysisComplete}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-8 animate-fade-in">
            {analysisResults ? (
              <AnalysisResults results={analysisResults} />
            ) : (
              <Card className="border-0 bg-white/5 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden">
                <CardContent className="p-16 text-center relative z-10">
                  <div className="space-y-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                      <AlertTriangle className="relative h-16 w-16 text-yellow-400 mx-auto animate-bounce" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      No Analysis Yet
                    </h3>
                    <p className="text-white/70 text-lg max-w-md mx-auto">
                      Please complete the column mapping first to see analysis results.
                    </p>
                    <Button 
                      onClick={() => setActiveTab('mapping')}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-2xl shadow-xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
                    >
                      <Zap className="h-5 w-5 mr-2" />
                      Go to Mapping
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="export" className="space-y-8 animate-fade-in">
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
