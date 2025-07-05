
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Users, Building, CheckCircle, XCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AnalysisResultsProps {
  results: {
    summary: {
      totalRows: number;
      mappedFields: number;
      hasContactInfo: boolean;
    };
    duplicates: any[];
    grouping: Record<string, any[]>;
    missingData: any[];
    contactCandidates: any[];
  };
}

const AnalysisResults = ({ results }: AnalysisResultsProps) => {
  const { summary, duplicates, grouping, missingData, contactCandidates } = results;

  const duplicatePercentage = (duplicates.length / summary.totalRows) * 100;
  const contactPercentage = (contactCandidates.length / summary.totalRows) * 100;
  const missingDataPercentage = (missingData.length / summary.totalRows) * 100;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Rows</p>
                <p className="text-2xl font-bold text-blue-900">{summary.totalRows}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Contact Ready</p>
                <p className="text-2xl font-bold text-green-900">{contactCandidates.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Duplicates</p>
                <p className="text-2xl font-bold text-yellow-900">{duplicates.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Missing Data</p>
                <p className="text-2xl font-bold text-red-900">{missingData.length}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Quality */}
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>Data Quality Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Contact Completeness</span>
              <span className="text-sm text-gray-600">{contactPercentage.toFixed(1)}%</span>
            </div>
            <Progress value={contactPercentage} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Duplicate Rate</span>
              <span className="text-sm text-gray-600">{duplicatePercentage.toFixed(1)}%</span>
            </div>
            <Progress value={duplicatePercentage} className="h-2 bg-red-100" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Missing Data Rate</span>
              <span className="text-sm text-gray-600">{missingDataPercentage.toFixed(1)}%</span>
            </div>
            <Progress value={missingDataPercentage} className="h-2 bg-yellow-100" />
          </div>
        </CardContent>
      </Card>

      {/* Grouping Analysis */}
      {Object.keys(grouping).length > 0 && (
        <Card className="bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="h-5 w-5 text-blue-600" />
              <span>Group Analysis</span>
            </CardTitle>
            <CardDescription>
              Distribution by organization/school
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64">
              <div className="space-y-2">
                {Object.entries(grouping)
                  .sort(([,a], [,b]) => b.length - a.length)
                  .map(([group, members]) => (
                    <div key={group} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <div>
                        <p className="font-medium">{group}</p>
                        <p className="text-sm text-gray-600">{members.length} members</p>
                      </div>
                      <Badge variant="secondary">
                        {((members.length / summary.totalRows) * 100).toFixed(1)}%
                      </Badge>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {/* Issues Found */}
      {(duplicates.length > 0 || missingData.length > 0) && (
        <Card className="bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <span>Issues Found</span>
            </CardTitle>
            <CardDescription>
              Data quality issues that may need attention
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {duplicates.length > 0 && (
              <div>
                <h4 className="font-medium text-yellow-700 mb-2">
                  Potential Duplicates ({duplicates.length})
                </h4>
                <ScrollArea className="h-32 bg-yellow-50 rounded p-2">
                  <div className="space-y-1">
                    {duplicates.slice(0, 10).map((item, index) => (
                      <div key={index} className="text-sm text-yellow-800">
                        {Object.values(item).join(' • ')}
                      </div>
                    ))}
                    {duplicates.length > 10 && (
                      <div className="text-sm text-yellow-600 italic">
                        ... and {duplicates.length - 10} more
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            )}

            {missingData.length > 0 && (
              <div>
                <h4 className="font-medium text-red-700 mb-2">
                  Incomplete Records ({missingData.length})
                </h4>
                <div className="text-sm text-red-600 bg-red-50 rounded p-2">
                  {missingData.length} records have missing required information
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AnalysisResults;
