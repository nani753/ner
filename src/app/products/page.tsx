import { Metadata } from 'next';
import { ProductFilters } from '@/components/products/product-filters';
import { ProductCard } from '@/components/products/product-card';
import connectDB from '@/lib/db';
import { Product } from '@/lib/models';

export const metadata: Metadata = {
  title: 'Products | NerlumaHub',
  description: 'Browse our selection of sound systems, lighting systems, and event gear.',
};

interface SearchParams {
  category?: string;
  useCase?: string;
  minPrice?: string;
  maxPrice?: string;
  page?: string;
}

async function getProducts(searchParams: SearchParams) {
  const page = parseInt(searchParams.page || '1');
  const limit = 12;

  // Build filter query
  const filter: any = {};
  if (searchParams.category) filter.category = searchParams.category;
  if (searchParams.useCase) filter.useCase = { $in: searchParams.useCase.split(',') };
  if (searchParams.minPrice || searchParams.maxPrice) {
    filter['price.amount'] = {};
    if (searchParams.minPrice) filter['price.amount'].$gte = parseInt(searchParams.minPrice);
    if (searchParams.maxPrice) filter['price.amount'].$lte = parseInt(searchParams.maxPrice);
  }

  await connectDB();

  const total = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .sort({ createdAt: 'desc' })
    .skip((page - 1) * limit)
    .limit(limit);

  return {
    products,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { products, pagination } = await getProducts(searchParams);

  return (
    <div className="container py-8">
      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        <div>
          <ProductFilters />
        </div>
        <div>
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="text-muted-foreground">
              {pagination.total} products found
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product._id.toString()} product={product} />
            ))}
          </div>
          {/* TODO: Add pagination */}
        </div>
      </div>
    </div>
  );
}