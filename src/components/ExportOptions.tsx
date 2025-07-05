
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Share, FileText, Users, BarChart3 } from 'lucide-react';
import { exportToCSV, exportToExcel, exportToJSON, shareFile } from '@/lib/exportHelpers';
import { generateVCF, downloadVCF, ContactData } from '@/lib/generateVCF';
import { toast } from '@/hooks/use-toast';

interface ExportOptionsProps {
  data: {
    headers: string[];
    rows: any[];
    totalRows: number;
  };
  columnMapping: Record<string, string>;
  analysisResults?: any;
}

const ExportOptions = ({ data, columnMapping, analysisResults }: ExportOptionsProps) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format: string, dataToExport: any[], filename: string) => {
    setIsExporting(true);
    try {
      switch (format) {
        case 'csv':
          exportToCSV(dataToExport, `${filename}.csv`);
          break;
        case 'excel':
          exportToExcel(dataToExport, `${filename}.xlsx`);
          break;
        case 'json':
          exportToJSON(dataToExport, `${filename}.json`);
          break;
      }
      toast({
        title: "Export Successful",
        description: `${filename}.${format} has been downloaded.`,
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export Failed",
        description: "There was an error exporting your data.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleVCFExport = () => {
    if (!columnMapping.name) {
      toast({
        title: "Missing Name Mapping",
        description: "Please map a name column first.",
        variant: "destructive",
      });
      return;
    }

    const contacts: ContactData[] = data.rows
      .filter(row => row[columnMapping.name])
      .map(row => ({
        name: row[columnMapping.name],
        phone: columnMapping.phone ? row[columnMapping.phone] : undefined,
        email: columnMapping.email ? row[columnMapping.email] : undefined,
        organization: columnMapping.school ? row[columnMapping.school] : undefined,
        address: columnMapping.address ? row[columnMapping.address] : undefined,
      }));

    if (contacts.length === 0) {
      toast({
        title: "No Contacts Found",
        description: "No valid contact data to export.",
        variant: "destructive",
      });
      return;
    }

    try {
      const vcfContent = generateVCF(contacts);
      downloadVCF(vcfContent, 'contacts.vcf');
      toast({
        title: "VCF Export Successful",
        description: `${contacts.length} contacts exported to VCF format.`,
      });
    } catch (error) {
      console.error('VCF export error:', error);
      toast({
        title: "VCF Export Failed",
        description: "There was an error creating the contact file.",
        variant: "destructive",
      });
    }
  };

  const exportFormats = [
    { key: 'csv', label: 'CSV', icon: FileText, description: 'Comma-separated values' },
    { key: 'excel', label: 'Excel', icon: BarChart3, description: 'Microsoft Excel format' },
    { key: 'json', label: 'JSON', icon: FileText, description: 'JavaScript Object Notation' },
  ];

  const contactCount = analysisResults?.contactCandidates?.length || 0;
  const groupCount = analysisResults?.grouping ? Object.keys(analysisResults.grouping).length : 0;

  return (
    <div className="space-y-6">
      {/* Contact Export */}
      <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-green-600" />
            <span>Contact Cards</span>
          </CardTitle>
          <CardDescription>
            Export contact information as VCF (vCard) files
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">
                {contactCount} contacts ready for export
              </p>
              <p className="text-xs text-gray-600">
                Requires name mapping to generate contact cards
              </p>
            </div>
            <Button
              onClick={handleVCFExport}
              disabled={!columnMapping.name || contactCount === 0}
              className="bg-green-600 hover:bg-green-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Export VCF
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Export */}
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span>Data Export</span>
          </CardTitle>
          <CardDescription>
            Export your processed data in various formats
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exportFormats.map((format) => (
              <div key={format.key} className="p-4 border rounded-lg bg-white/50">
                <div className="flex items-center space-x-2 mb-2">
                  <format.icon className="h-5 w-5 text-blue-600" />
                  <h4 className="font-medium">{format.label}</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  {format.description}
                </p>
                <Button
                  onClick={() => handleExport(format.key, data.rows, 'exported_data')}
                  disabled={isExporting}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export {format.label}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analysis Export */}
      {analysisResults && (
        <Card className="bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              <span>Analysis Results</span>
            </CardTitle>
            <CardDescription>
              Export analysis findings and grouped data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg bg-white/50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Analysis Summary</h4>
                  <Badge variant="secondary">{data.totalRows} rows</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Complete analysis results in JSON format
                </p>
                <Button
                  onClick={() => handleExport('json', [analysisResults], 'analysis_results')}
                  disabled={isExporting}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Analysis
                </Button>
              </div>

              {groupCount > 0 && (
                <div className="p-4 border rounded-lg bg-white/50">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Grouped Data</h4>
                    <Badge variant="secondary">{groupCount} groups</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Data organized by groups/organizations
                  </p>
                  <Button
                    onClick={() => handleExport('json', analysisResults.grouping, 'grouped_data')}
                    disabled={isExporting}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Groups
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mobile Share */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Share className="h-5 w-5 text-blue-600" />
            <span>Mobile Sharing</span>
          </CardTitle>
          <CardDescription>
            Use native mobile sharing when running as an app
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            When running as a native Android app, you can use the device's native sharing features 
            to send exported data to other apps.
          </p>
          <Badge variant="outline">Available in APK build</Badge>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExportOptions;
