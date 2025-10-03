import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface ProductSpecsProps {
  specifications: Record<string, any>;
}

export function ProductSpecs({ specifications }: ProductSpecsProps) {
  const specs = Object.entries(specifications);

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Specification</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {specs.map(([key, value]) => (
            <TableRow key={key}>
              <TableCell className="font-medium">
                {key.split(/(?=[A-Z])/).join(' ')}
              </TableCell>
              <TableCell>{value.toString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}