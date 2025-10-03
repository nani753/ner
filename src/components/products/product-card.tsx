'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Document } from 'mongoose';
import { IProduct } from '@/lib/models';
import { useComparison } from '@/lib/context/comparison-context';

type ProductWithId = IProduct & Document;

interface ProductCardProps {
  product: ProductWithId;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToComparison, removeFromComparison, isInComparison } = useComparison();
  const inComparison = isInComparison(product._id.toString());

  const toggleComparison = () => {
    if (inComparison) {
      removeFromComparison(product._id.toString());
    } else {
      addToComparison(product);
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-square">
        <Image
          src={product.images.hero}
          alt={product.title}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-4">
        <div className="space-y-1">
          <h3 className="font-semibold">{product.title}</h3>
          <p className="text-sm text-muted-foreground">{product.brand}</p>
        </div>
        {product.price && (
          <p className="mt-2 font-semibold">
            {product.price.currency} {product.price.amount}
          </p>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 space-x-2">
        <Button asChild variant="secondary">
          <Link href={`/products/${product.slug}`}>View Details</Link>
        </Button>
        <Button
          variant={inComparison ? "destructive" : "outline"}
          onClick={toggleComparison}
        >
          {inComparison ? "Remove Compare" : "Compare"}
        </Button>
      </CardFooter>
    </Card>
  );
}