import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { AdminLayout } from '@/components/layout';
import { ProductForm } from '@/components/products/product-form';
import { requireAdmin } from '@/lib/auth-utils';

export const metadata: Metadata = {
  title: 'New Product | Admin Dashboard',
  description: 'Create a new product',
};

export default async function NewProductPage() {
  await requireAdmin();

  async function createProduct(data: any) {
    'use server';

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      redirect('/admin/products');
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">New Product</h1>
        <p className="text-muted-foreground">
          Create a new product in your catalog
        </p>
      </div>

      <div className="space-y-4">
        <ProductForm onSubmit={createProduct} />
      </div>
    </AdminLayout>
  );
}