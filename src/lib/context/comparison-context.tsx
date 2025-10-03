'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from 'react';
import { Document } from 'mongoose';
import { IProduct } from '@/lib/models';

type ProductWithId = IProduct & Document;

interface ComparisonContextType {
  products: ProductWithId[];
  addToComparison: (product: ProductWithId) => void;
  removeFromComparison: (productId: string) => void;
  clearComparison: () => void;
  isInComparison: (productId: string) => boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(
  undefined
);

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<ProductWithId[]>([]);

  const addToComparison = useCallback(
    (product: IProduct) => {
      if (products.length < 4 && !isInComparison(product._id.toString())) {
        setProducts((prev) => [...prev, product]);
      }
    },
    [products]
  );

  const removeFromComparison = useCallback((productId: string) => {
    setProducts((prev) =>
      prev.filter((p) => p._id.toString() !== productId)
    );
  }, []);

  const clearComparison = useCallback(() => {
    setProducts([]);
  }, []);

  const isInComparison = useCallback(
    (productId: string) => {
      return products.some((p) => p._id.toString() === productId);
    },
    [products]
  );

  const value = useMemo(
    () => ({
      products,
      addToComparison,
      removeFromComparison,
      clearComparison,
      isInComparison,
    }),
    [products, addToComparison, removeFromComparison, clearComparison, isInComparison]
  );

  return (
    <ComparisonContext.Provider value={value}>
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
}