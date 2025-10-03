'use client';

import { Document } from 'mongoose';
import { useComparison } from '@/lib/context/comparison-context';
import { IProduct } from '@/lib/models';

type ProductWithId = IProduct & Document;
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { XCircle } from 'lucide-react';
import Image from 'next/image';

export function ComparisonDrawer() {
  const { products, removeFromComparison, clearComparison } = useComparison();

  if (products.length === 0) {
    return null;
  }

  const allSpecs = products.reduce((acc, product) => {
    Object.keys(product.specifications).forEach((key) => {
      if (!acc.includes(key)) {
        acc.push(key);
      }
    });
    return acc;
  }, [] as string[]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="fixed bottom-4 right-4 z-50">
          Compare ({products.length})
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh]">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle>Product Comparison</SheetTitle>
            <Button variant="ghost" onClick={clearComparison}>
              Clear All
            </Button>
          </div>
        </SheetHeader>
        <div className="mt-4 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Feature</TableHead>
                {products.map((product) => (
                  <TableHead key={product._id.toString()} className="min-w-[250px]">
                    <div className="space-y-2">
                      <div className="relative aspect-square w-full">
                        <Image
                          src={product.images.hero}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{product.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {product.brand}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromComparison(product._id.toString())}
                        >
                          <XCircle className="h-5 w-5" />
                        </Button>
                      </div>
                      {product.price && (
                        <p className="font-semibold">
                          {product.price.currency} {product.price.amount}
                        </p>
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Category</TableCell>
                {products.map((product) => (
                  <TableCell key={product._id.toString()}>
                    {product.category}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Use Cases</TableCell>
                {products.map((product) => (
                  <TableCell key={product._id.toString()}>
                    {product.useCase.join(', ')}
                  </TableCell>
                ))}
              </TableRow>
              {allSpecs.map((spec) => (
                <TableRow key={spec}>
                  <TableCell className="font-medium">
                    {spec.split(/(?=[A-Z])/).join(' ')}
                  </TableCell>
                  {products.map((product) => (
                    <TableCell key={product._id.toString()}>
                      {product.specifications[spec]?.toString() || '-'}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="font-medium">Pros</TableCell>
                {products.map((product) => (
                  <TableCell key={product._id.toString()}>
                    <ul className="list-disc list-inside">
                      {product.pros.map((pro, index) => (
                        <li key={index}>{pro}</li>
                      ))}
                    </ul>
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Cons</TableCell>
                {products.map((product) => (
                  <TableCell key={product._id.toString()}>
                    <ul className="list-disc list-inside">
                      {product.cons.map((con, index) => (
                        <li key={index}>{con}</li>
                      ))}
                    </ul>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </SheetContent>
    </Sheet>
  );
}