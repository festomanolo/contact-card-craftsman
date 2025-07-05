
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileSpreadsheet, Smartphone, Download, Users, BarChart3, Sparkles, Zap, Star, Layers, Cpu, Palette } from 'lucide-react';
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
      gradient: "from-blue-400 via-cyan-400 to-teal-400"
    },
    {
      icon: Users,
      title: "Contact Cards",
      description: "Generate .vcf contact cards from spreadsheet data",
      gradient: "from-purple-400 via-pink-400 to-rose-400"
    },
    {
      icon: BarChart3,
      title: "Smart Analysis",
      description: "Detect duplicates, group data, and find missing information",
      gradient: "from-green-400 via-emerald-400 to-cyan-400"
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Optimized for mobile with native Android APK export",
      gradient: "from-orange-400 via-red-400 to-pink-400"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating Orbs */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="floating-orb"
          style={{
            width: `${20 + Math.random() * 40}px`,
            height: `${20 + Math.random() * 40}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${6 + Math.random() * 4}s`
          }}
        />
      ))}

      {/* Liquid Glass Navigation */}
      <div className="nav-glass sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 animate-slide-up">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl blur-lg opacity-60 animate-pulse-smooth"></div>
                <div className="relative glass-card p-3">
                  <FileSpreadsheet className="h-8 w-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold liquid-text">
                  Contact Craftsman
                </h1>
                <p className="text-sm text-white/80 flex items-center gap-2">
                  <Sparkles className="h-3 w-3 animate-pulse-smooth" />
                  AI-Powered Liquid Experience
                </p>
              </div>
            </div>
            <Button
              onClick={() => setUploadMode(!uploadMode)}
              className="glass-button text-white hover:text-white border-0 px-6 py-3 rounded-2xl"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        {/* Hero Section with Liquid Glass */}
        <div className="text-center mb-20 animate-slide-up">
          <div className="relative inline-block mb-12">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-30 animate-pulse-smooth"></div>
            <div className="relative glass-card liquid-gradient p-8 transform hover:scale-105 transition-all duration-500">
              <FileSpreadsheet className="h-20 w-20 text-white animate-bounce-in mx-auto" />
              <div className="absolute top-2 right-2">
                <Layers className="h-6 w-6 text-white/60 animate-float-gentle" />
              </div>
              <div className="absolute bottom-2 left-2">
                <Cpu className="h-5 w-5 text-white/40 animate-pulse-smooth" />
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <h2 className="text-5xl md:text-7xl font-bold liquid-text animate-bounce-in">
              Transform Your
              <span className="block">
                Spreadsheets
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed animate-slide-up">
              Experience the future of data analysis with our 
              <span className="liquid-text font-semibold"> liquid glass interface.</span>
              <br />Upload, analyze, and export with unprecedented elegance.
            </p>
            
            {!uploadMode && (
              <div className="pt-8 animate-bounce-in" style={{ animationDelay: '0.3s' }}>
                <Button
                  onClick={() => setUploadMode(true)}
                  className="btn-liquid text-white border-0 px-12 py-6 text-xl rounded-3xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="flex items-center relative z-10">
                    <Zap className="h-7 w-7 mr-4 animate-pulse-smooth" />
                    Get Started
                    <Star className="h-6 w-6 ml-4 animate-float-gentle" />
                  </div>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* File Upload Section with Liquid Glass */}
        {uploadMode && (
          <div className="mb-20 animate-slide-up">
            <div className="glass-card liquid-gradient p-8 hover-glass">
              <FileUploader onFileSelect={(file, data) => {
                console.log('File uploaded:', file.name);
                navigate('/analyze', { state: { file, data } });
              }} />
            </div>
          </div>
        )}

        {/* Features Grid with Liquid Glass */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-card liquid-gradient hover-glass group p-8 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start space-x-6">
                <div className={`relative p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl blur-lg opacity-50`}></div>
                  <feature.icon className="h-8 w-8 text-white relative z-10" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:liquid-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-white/80 text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sample Data with Liquid Glass */}
        <div className="glass-card liquid-gradient hover-glass mb-20 p-8 animate-slide-up">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl">
              <Download className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">Sample Data</h3>
              <p className="text-white/80 text-lg">
                Try with sample spreadsheet files to experience the liquid magic
              </p>
            </div>
            <Palette className="h-6 w-6 text-white/60 animate-float-gentle ml-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['contacts.xlsx', 'students.csv', 'members.ods'].map((file, index) => (
              <div 
                key={file}
                className="glass-button hover-glass p-6 rounded-2xl group cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <FileSpreadsheet className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-semibold text-white text-lg">{file}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* APK Build Instructions with Liquid Glass */}
        <div className="glass-card liquid-gradient p-10 text-white hover-glass animate-slide-up">
          <div className="flex items-center mb-8">
            <div className="p-3 bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl mr-4">
              <Smartphone className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-4xl font-bold liquid-text">
              Build Android APK
            </h3>
            <Zap className="h-6 w-6 text-cyan-400 animate-pulse-smooth ml-auto" />
          </div>
          <div className="space-y-8 text-lg">
            <div className="glass-card p-6 border border-green-400/30">
              <p className="font-mono text-green-300 mb-4 text-xl"># Install Capacitor & Android platform:</p>
              <div className="space-y-3 font-mono text-white/90 text-base">
                <p>npm install @capacitor/core @capacitor/cli</p>
                <p>npx cap init</p>
                <p>npx cap add android</p>
              </div>
            </div>
            <div className="glass-card p-6 border border-blue-400/30">
              <p className="font-mono text-blue-300 mb-4 text-xl"># Build and sync:</p>
              <div className="space-y-3 font-mono text-white/90 text-base">
                <p>npm run build</p>
                <p>npx cap copy</p>
                <p>npx cap open android</p>
              </div>
            </div>
            <div className="glass-card p-6 border border-purple-400/30">
              <p className="text-white text-xl">
                🚀 Then open in Android Studio → Build APK
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
