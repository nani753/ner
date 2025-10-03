import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { AdminLayout } from '@/components/layout';
import { ProductForm } from '@/components/products/product-form';
import { requireAdmin } from '@/lib/auth-utils';
import connectDB from '@/lib/db';
import { Product } from '@/lib/models';

interface EditProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: EditProductPageProps): Promise<Metadata> {
  await connectDB();
  const product = await Product.findOne({ slug: params.slug });

  if (!product) {
    return {
      title: 'Product Not Found | Admin Dashboard',
    };
  }

  return {
    title: `Edit ${product.title} | Admin Dashboard`,
  };
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  await requireAdmin();
  await connectDB();

  const product = await Product.findOne({ slug: params.slug });

  if (!product) {
    notFound();
  }

  async function updateProduct(data: any) {
    'use server';

    try {
      const response = await fetch(`/api/products/${params.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      redirect('/admin/products');
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Edit Product</h1>
        <p className="text-muted-foreground">
          Update product information
        </p>
      </div>

      <div className="space-y-4">
        <ProductForm
          initialData={product}
          onSubmit={updateProduct}
        />
      </div>
    </AdminLayout>
  );
}