'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Upload, Download } from 'lucide-react';

export function ProductCSVActions() {
  // Toast is imported directly from @/components/ui/toast
  const [isImporting, setIsImporting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/products/csv', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error);
      }

      toast.success(
        'Import successful',
        { description: `Imported ${data.data.imported} products` }
      );
      
      // Refresh the page to show new products
      window.location.reload();
    } catch (error) {
      toast.error(
        'Import failed',
        { description: (error as Error).message }
      );
    } finally {
      setIsImporting(false);
      event.target.value = ''; // Reset file input
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const response = await fetch('/api/products/csv');
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'products.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error(
        'Export failed',
        { description: (error as Error).message }
      );
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Hidden file input triggered by the Import button */}
      <input
        type="file"
        accept=".csv"
        className="hidden"
        onChange={handleImport}
        id="csv-import"
      />
      <Button
        variant="outline"
        size="sm"
        disabled={isImporting}
        onClick={() => document.getElementById('csv-import')?.click()}
      >
        <Upload className="mr-2 h-4 w-4" />
        {isImporting ? 'Importing...' : 'Import CSV'}
      </Button>
      <Button
        variant="outline"
        size="sm"
        disabled={isExporting}
        onClick={handleExport}
      >
        <Download className="mr-2 h-4 w-4" />
        {isExporting ? 'Exporting...' : 'Export CSV'}
      </Button>
    </div>
  );
}