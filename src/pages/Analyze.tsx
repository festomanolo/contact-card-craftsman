
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Users, AlertTriangle, BarChart3, Sparkles, Zap, Star, Layers, Cpu } from 'lucide-react';
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating Orbs */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="floating-orb"
          style={{
            width: `${15 + Math.random() * 30}px`,
            height: `${15 + Math.random() * 30}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${6 + Math.random() * 4}s`
          }}
        />
      ))}

      {/* Liquid Glass Header */}
      <div className="nav-glass sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 animate-slide-up">
              <Button
                onClick={() => navigate('/')}
                className="glass-button text-white hover:text-white border-0 p-3 rounded-xl"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold liquid-text flex items-center gap-3">
                  <Sparkles className="h-6 w-6 text-cyan-400 animate-pulse-smooth" />
                  {file.name}
                </h1>
                <p className="text-white/70 text-lg flex items-center gap-2">
                  <Layers className="h-4 w-4 animate-float-gentle" />
                  {data.totalRows} rows • {data.headers.length} columns
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => setActiveTab('export')}
                className="glass-button text-white hover:text-white border-0 px-6 py-3 rounded-xl"
              >
                <Download className="h-5 w-5 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="glass-card liquid-gradient p-3 w-full grid grid-cols-4 rounded-2xl">
            {Object.entries(tabIcons).map(([key, Icon]) => (
              <TabsTrigger 
                key={key}
                value={key} 
                className="glass-button text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2 px-4 py-3"
              >
                <Icon className="h-5 w-5" />
                <span className="hidden sm:inline capitalize font-semibold">{key}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="preview" className="space-y-8 animate-slide-up">
            <div className="glass-card liquid-gradient hover-glass p-8 relative">
              <div className="absolute top-4 right-4">
                <Cpu className="h-6 w-6 text-white/30 animate-pulse-smooth" />
              </div>
              <div className="flex items-center space-x-4 mb-8">
                <div className="p-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold liquid-text">Data Preview</h2>
                  <p className="text-white/80 text-xl">
                    Review your spreadsheet data and column headers
                  </p>
                </div>
              </div>
              <SpreadsheetTable data={data} maxRows={10} />
            </div>
          </TabsContent>

          <TabsContent value="mapping" className="space-y-8 animate-slide-up">
            <div className="glass-card liquid-gradient hover-glass p-8 relative">
              <div className="absolute top-4 right-4">
                <Star className="h-6 w-6 text-white/30 animate-float-gentle" />
              </div>
              <div className="flex items-center space-x-4 mb-8">
                <div className="p-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold liquid-text">Column Mapping</h2>
                  <p className="text-white/80 text-xl">
                    Map your columns to standard fields for contact generation and analysis
                  </p>
                </div>
              </div>
              <ColumnMapper
                headers={data.headers}
                data={data.rows}
                onMappingChange={handleMappingChange}
                onAnalysisComplete={handleAnalysisComplete}
              />
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-8 animate-slide-up">
            {analysisResults ? (
              <AnalysisResults results={analysisResults} />
            ) : (
              <div className="glass-card liquid-gradient hover-glass p-16 text-center relative">
                <div className="absolute top-4 right-4">
                  <Layers className="h-6 w-6 text-white/30 animate-float-gentle" />
                </div>
                <div className="space-y-8">
                  <div className="relative glass-card p-8 rounded-full inline-block">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-2xl opacity-30 animate-pulse-smooth"></div>
                    <AlertTriangle className="relative h-20 w-20 text-yellow-300 animate-bounce" />
                  </div>
                  <h3 className="text-4xl font-bold liquid-text">
                    No Analysis Yet
                  </h3>
                  <p className="text-white/80 text-2xl max-w-2xl mx-auto leading-relaxed">
                    Please complete the column mapping first to see analysis results.
                  </p>
                  <Button 
                    onClick={() => setActiveTab('mapping')}
                    className="btn-liquid text-white border-0 px-10 py-4 text-xl rounded-3xl transform hover:scale-105 transition-all duration-300"
                  >
                    <Zap className="h-6 w-6 mr-3" />
                    Go to Mapping
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="export" className="space-y-8 animate-slide-up">
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
