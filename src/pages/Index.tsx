
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileSpreadsheet, Smartphone, Download, Users, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import FileUploader from '@/components/FileUploader';

const Index = () => {
  const [uploadMode, setUploadMode] = useState(false);
  const navigate = useNavigate();

  const features = [
    {
      icon: FileSpreadsheet,
      title: "Multi-Format Support",
      description: "Upload .xlsx, .csv, and .ods files with intelligent parsing"
    },
    {
      icon: Users,
      title: "Contact Cards",
      description: "Generate .vcf contact cards from spreadsheet data"
    },
    {
      icon: BarChart3,
      title: "Smart Analysis",
      description: "Detect duplicates, group data, and find missing information"
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Optimized for mobile with native Android APK export"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                <FileSpreadsheet className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Contact Craftsman
                </h1>
                <p className="text-xs text-gray-500">Spreadsheet Analyzer</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setUploadMode(!uploadMode)}
              className="bg-white/50"
            >
              <Upload className="h-4 w-4 mr-1" />
              Upload
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl mb-6 inline-block">
            <FileSpreadsheet className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Transform Your Spreadsheets
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Upload spreadsheets, analyze data, generate contact cards, and export to multiple formats. 
            Built for mobile with native Android support.
          </p>
          
          {!uploadMode && (
            <Button
              onClick={() => setUploadMode(true)}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Upload className="h-5 w-5 mr-2" />
              Get Started
            </Button>
          )}
        </div>

        {/* File Upload Section */}
        {uploadMode && (
          <div className="mb-12">
            <Card className="border-2 border-dashed border-gray-200 bg-white/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <FileUploader onFileSelect={(file, data) => {
                  console.log('File uploaded:', file.name);
                  navigate('/analyze', { state: { file, data } });
                }} />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white/50 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-3 rounded-lg">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sample Data Section */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Download className="h-5 w-5 text-blue-600" />
              <span>Sample Data</span>
            </CardTitle>
            <CardDescription>
              Try with sample spreadsheet files to see the power of Contact Craftsman
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="justify-start bg-white/50">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                contacts.xlsx
              </Button>
              <Button variant="outline" className="justify-start bg-white/50">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                students.csv
              </Button>
              <Button variant="outline" className="justify-start bg-white/50">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                members.ods
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* APK Build Instructions */}
        <div className="mt-12 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4 flex items-center">
            <Smartphone className="h-6 w-6 mr-2" />
            Build Android APK
          </h3>
          <div className="space-y-4 text-sm">
            <div className="bg-black/30 rounded-lg p-4">
              <p className="font-mono text-green-400 mb-2"># Install Capacitor & Android platform:</p>
              <p className="font-mono">npm install @capacitor/core @capacitor/cli</p>
              <p className="font-mono">npx cap init</p>
              <p className="font-mono">npx cap add android</p>
            </div>
            <div className="bg-black/30 rounded-lg p-4">
              <p className="font-mono text-green-400 mb-2"># Build and sync:</p>
              <p className="font-mono">npm run build</p>
              <p className="font-mono">npx cap copy</p>
              <p className="font-mono">npx cap open android</p>
            </div>
            <p className="text-gray-300">Then open in Android Studio → Build APK</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
