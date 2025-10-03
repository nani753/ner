import { Metadata } from 'next';
import connectDB from '@/lib/db';
import { Product } from '@/lib/models';
import { ProductGallery } from '@/components/products/product-gallery';
import { ProductSpecs } from '@/components/products/product-specs';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ExternalLink, CheckCircle, XCircle } from 'lucide-react';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  await connectDB();
  const product = await Product.findOne({ slug: params.slug });

  if (!product) {
    return {
      title: 'Product Not Found | NerlumaHub',
    };
  }

  return {
    title: `${product.title} | NerlumaHub`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  await connectDB();
  const product = await Product.findOne({ slug: params.slug });

  if (!product) {
    return (
      <div className="container py-8">
        <Alert variant="destructive">
          <AlertDescription>Product not found</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <ProductGallery images={product.images} title={product.title} />
        
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-lg text-muted-foreground">{product.brand}</p>
          </div>

          {product.price && (
            <div className="text-2xl font-bold">
              {product.price.currency} {product.price.amount}
            </div>
          )}

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Overview</h2>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Use Cases</h2>
            <div className="flex gap-2">
              {product.useCase.map((uc: string) => (
                <span
                  key={uc}
                  className="rounded-full bg-secondary px-3 py-1 text-sm"
                >
                  {uc}
                </span>
              ))}
            </div>
          </div>

          {product.affiliateLinks.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Buy Now</h2>
              <div className="flex flex-wrap gap-4">
                {product.affiliateLinks.map((link: { platform: string; url: string }, index: number) => (
                  <Button key={index} asChild>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      {link.platform}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Pros</h2>
              <ul className="space-y-2">
                {product.pros.map((pro: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Cons</h2>
              <ul className="space-y-2">
                {product.cons.map((con: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-red-500" />
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {product.manufacturerInfo && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Manufacturer Information</h2>
              <div className="space-y-2">
                <p>
                  <strong>Name:</strong> {product.manufacturerInfo.name}
                </p>
                {product.manufacturerInfo.website && (
                  <p>
                    <strong>Website:</strong>{' '}
                    <a
                      href={product.manufacturerInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Visit manufacturer website
                    </a>
                  </p>
                )}
                {product.manufacturerInfo.support && (
                  <p>
                    <strong>Support:</strong>{' '}
                    <a
                      href={product.manufacturerInfo.support}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Get support
                    </a>
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Specifications</h2>
            <ProductSpecs specifications={product.specifications} />
          </div>

          {product.review && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Review</h2>
              <p className="text-muted-foreground">{product.review}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}