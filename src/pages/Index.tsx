
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileSpreadsheet, Smartphone, Download, Users, BarChart3, Sparkles, Zap, Star } from 'lucide-react';
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
      description: "Upload .xlsx, .csv, and .ods files with intelligent parsing",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Contact Cards",
      description: "Generate .vcf contact cards from spreadsheet data",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: BarChart3,
      title: "Smart Analysis",
      description: "Detect duplicates, group data, and find missing information",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Optimized for mobile with native Android APK export",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-r from-pink-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 backdrop-blur-xl bg-white/5 border-b border-white/10 sticky top-0">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-75 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl shadow-2xl">
                  <FileSpreadsheet className="h-8 w-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                  Contact Craftsman
                </h1>
                <p className="text-sm text-white/60 flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  AI-Powered Spreadsheet Analyzer
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setUploadMode(!uploadMode)}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-50 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500">
              <FileSpreadsheet className="h-16 w-16 text-white animate-bounce" />
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent animate-fade-in">
              Transform Your
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Spreadsheets
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Upload spreadsheets, analyze data with AI, generate contact cards, and export to multiple formats. 
              <span className="text-cyan-300 font-semibold"> Built for the future.</span>
            </p>
            
            {!uploadMode && (
              <div className="pt-4">
                <Button
                  onClick={() => setUploadMode(true)}
                  size="lg"
                  className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-12 py-6 text-lg rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <div className="relative flex items-center">
                    <Zap className="h-6 w-6 mr-3 animate-pulse" />
                    Get Started
                    <Star className="h-5 w-5 ml-3 animate-spin" />
                  </div>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* File Upload Section */}
        {uploadMode && (
          <div className="mb-16 animate-fade-in">
            <Card className="border-0 bg-white/5 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
              <CardContent className="p-8 relative z-10">
                <FileUploader onFileSelect={(file, data) => {
                  console.log('File uploaded:', file.name);
                  navigate('/analyze', { state: { file, data } });
                }} />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group border-0 bg-white/5 backdrop-blur-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 rounded-3xl overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              <CardHeader className="relative z-10">
                <div className="flex items-center space-x-4">
                  <div className={`relative p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl blur-lg opacity-50`}></div>
                    <feature.icon className="h-8 w-8 text-white relative z-10" />
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-cyan-300 transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="text-white/70 text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sample Data Section */}
        <Card className="border-0 bg-gradient-to-r from-slate-800/50 to-purple-800/50 backdrop-blur-xl shadow-2xl rounded-3xl mb-16">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-white text-2xl">
              <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl">
                <Download className="h-6 w-6 text-white" />
              </div>
              <span>Sample Data</span>
            </CardTitle>
            <CardDescription className="text-white/70 text-lg">
              Try with sample spreadsheet files to experience the magic
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['contacts.xlsx', 'students.csv', 'members.ods'].map((file, index) => (
                <Button 
                  key={file}
                  variant="outline" 
                  className="group justify-start bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 rounded-2xl p-6 h-auto"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <FileSpreadsheet className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-medium">{file}</span>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* APK Build Instructions */}
        <div className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 rounded-3xl p-8 text-white shadow-2xl border border-white/10 backdrop-blur-xl">
          <h3 className="text-3xl font-bold mb-6 flex items-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            <Smartphone className="h-8 w-8 mr-3 text-cyan-400" />
            Build Android APK
          </h3>
          <div className="space-y-6 text-sm">
            <div className="bg-black/50 rounded-2xl p-6 border border-green-500/20">
              <p className="font-mono text-green-400 mb-3 text-base"># Install Capacitor & Android platform:</p>
              <div className="space-y-2 font-mono text-gray-300">
                <p>npm install @capacitor/core @capacitor/cli</p>
                <p>npx cap init</p>
                <p>npx cap add android</p>
              </div>
            </div>
            <div className="bg-black/50 rounded-2xl p-6 border border-blue-500/20">
              <p className="font-mono text-blue-400 mb-3 text-base"># Build and sync:</p>
              <div className="space-y-2 font-mono text-gray-300">
                <p>npm run build</p>
                <p>npx cap copy</p>
                <p>npx cap open android</p>
              </div>
            </div>
            <p className="text-white/80 text-base bg-purple-500/10 p-4 rounded-xl border border-purple-500/20">
              Then open in Android Studio → Build APK
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
