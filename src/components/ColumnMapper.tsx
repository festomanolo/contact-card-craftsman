
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, User, Phone, Mail, Building, MapPin } from 'lucide-react';
import { detectDuplicates, groupByColumn, findMissingData } from '@/lib/parseSpreadsheet';

interface ColumnMapperProps {
  headers: string[];
  data: any[];
  onMappingChange: (mapping: Record<string, string>) => void;
  onAnalysisComplete: (results: any) => void;
}

const standardFields = [
  { key: 'name', label: 'Name', icon: User, required: true },
  { key: 'phone', label: 'Phone', icon: Phone, required: false },
  { key: 'email', label: 'Email', icon: Mail, required: false },
  { key: 'school', label: 'School/Organization', icon: Building, required: false },
  { key: 'address', label: 'Address', icon: MapPin, required: false },
];

const ColumnMapper = ({ headers, data, onMappingChange, onAnalysisComplete }: ColumnMapperProps) => {
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleMappingUpdate = (standardField: string, column: string) => {
    const newMapping = { ...mapping };
    if (column === 'none') {
      delete newMapping[standardField];
    } else {
      newMapping[standardField] = column;
    }
    setMapping(newMapping);
    onMappingChange(newMapping);
  };

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    
    try {
      // Simulate analysis delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const results = {
        summary: {
          totalRows: data.length,
          mappedFields: Object.keys(mapping).length,
          hasContactInfo: !!(mapping.name && (mapping.phone || mapping.email)),
        },
        duplicates: mapping.name ? detectDuplicates(data, mapping.name) : [],
        grouping: mapping.school ? groupByColumn(data, mapping.school) : {},
        missingData: findMissingData(data, Object.values(mapping)),
        contactCandidates: data.filter(row => 
          row[mapping.name] && (row[mapping.phone] || row[mapping.email])
        ),
      };

      console.log('Analysis results:', results);
      onAnalysisComplete(results);
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getColumnPreview = (column: string) => {
    const values = data.slice(0, 3).map(row => row[column]).filter(v => v);
    return values.join(', ') || 'No data';
  };

  const canAnalyze = Object.keys(mapping).length > 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {standardFields.map((field) => (
          <Card key={field.key} className="bg-white/30">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <field.icon className="h-4 w-4 text-blue-600" />
                  <CardTitle className="text-sm">{field.label}</CardTitle>
                  {field.required && (
                    <Badge variant="destructive" className="text-xs">Required</Badge>
                  )}
                </div>
                <Select
                  value={mapping[field.key] || 'none'}
                  onValueChange={(value) => handleMappingUpdate(field.key, value)}
                >
                  <SelectTrigger className="w-48 bg-white/50">
                    <SelectValue placeholder="Select column" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="none">Not mapped</SelectItem>
                    {headers.map((header) => (
                      <SelectItem key={header} value={header}>
                        {header}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            {mapping[field.key] && (
              <CardContent className="pt-0">
                <CardDescription className="text-xs">
                  Preview: {getColumnPreview(mapping[field.key])}
                </CardDescription>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t">
        <div className="text-sm text-gray-600">
          {Object.keys(mapping).length} fields mapped
        </div>
        <Button
          onClick={runAnalysis}
          disabled={!canAnalyze || isAnalyzing}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          {isAnalyzing ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          ) : (
            <Play className="h-4 w-4 mr-2" />
          )}
          {isAnalyzing ? 'Analyzing...' : 'Run Analysis'}
        </Button>
      </div>
    </div>
  );
};

export default ColumnMapper;
