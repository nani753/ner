import { Metadata } from 'next';
import Link from 'next/link';
import { AdminLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { ProductCSVActions } from '@/components/products/product-csv-actions';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Edit, Trash } from 'lucide-react';
import { requireAdmin } from '@/lib/auth-utils';
import connectDB from '@/lib/db';
import { Product } from '@/lib/models';

export const metadata: Metadata = {
  title: 'Products | Admin Dashboard',
  description: 'Manage products in the admin dashboard',
};

async function getProducts() {
  await connectDB();
  return Product.find().sort({ createdAt: 'desc' });
}

export default async function AdminProductsPage() {
  await requireAdmin();
  const products = await getProducts();

  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-muted-foreground">
            Manage your product catalog
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button asChild>
            <Link href="/admin/products/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Link>
          </Button>
          <div className="border-l pl-4">
            <ProductCSVActions />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id.toString()}>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>
                    {product.price
                      ? `${product.price.currency} ${product.price.amount}`
                      : '-'}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                      >
                        <Link href={`/admin/products/${product.slug}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}