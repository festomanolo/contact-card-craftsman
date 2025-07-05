
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface SpreadsheetTableProps {
  data: {
    headers: string[];
    rows: any[];
    totalRows: number;
  };
  maxRows?: number;
}

const SpreadsheetTable = ({ data, maxRows = 10 }: SpreadsheetTableProps) => {
  const displayRows = maxRows ? data.rows.slice(0, maxRows) : data.rows;
  const hasMoreRows = data.totalRows > maxRows;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">
            {data.totalRows} total rows
          </Badge>
          <Badge variant="outline">
            {data.headers.length} columns
          </Badge>
        </div>
        {hasMoreRows && (
          <Badge variant="outline">
            Showing first {maxRows} rows
          </Badge>
        )}
      </div>

      <ScrollArea className="w-full">
        <div className="min-w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                {data.headers.map((header, index) => (
                  <TableHead key={index} className="min-w-32">
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayRows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell className="font-medium text-gray-500">
                    {rowIndex + 1}
                  </TableCell>
                  {data.headers.map((header, colIndex) => (
                    <TableCell key={colIndex} className="max-w-48">
                      <div className="truncate" title={row[header]}>
                        {row[header] || '-'}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>

      {displayRows.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No data to display
        </div>
      )}
    </div>
  );
};

export default SpreadsheetTable;
