import Papa from 'papaparse';
import { IProduct } from '@/lib/models';

interface ProductCSVRow {
  title: string;
  slug?: string;
  brand: string;
  category: string;
  description: string;
  price_amount: string;
  price_currency: string;
  specifications: string;
  hero_image: string;
  gallery_images: string;
  affiliate_links: string;
  pros: string;
  cons: string;
  review?: string;
  manufacturer_name: string;
  manufacturer_website?: string;
  manufacturer_support?: string;
  use_case: string;
}

function parseSpecifications(specs: string): Record<string, any> {
  if (!specs) return {};
  try {
    return JSON.parse(specs);
  } catch {
    return {};
  }
}

function parseAffiliateLinks(links: string): Array<{ platform: string; url: string; trackingId?: string }> {
  if (!links) return [];
  try {
    return JSON.parse(links);
  } catch {
    return [];
  }
}

function sanitizeCategory(category: string): 'sound-systems' | 'lighting-systems' | 'event-gear' {
  const sanitized = category.toLowerCase().trim();
  if (!['sound-systems', 'lighting-systems', 'event-gear'].includes(sanitized)) {
    throw new Error(`Invalid category: ${category}. Must be one of: sound-systems, lighting-systems, event-gear`);
  }
  return sanitized as 'sound-systems' | 'lighting-systems' | 'event-gear';
}

function sanitizeUseCase(useCase: string): ('live' | 'studio' | 'rental')[] {
  return useCase
    .split(',')
    .map(uc => uc.trim().toLowerCase())
    .filter(uc => ['live', 'studio', 'rental'].includes(uc)) as ('live' | 'studio' | 'rental')[];
}

function formatProductForCSV(product: IProduct) {
  return {
    title: product.title,
    slug: product.slug,
    brand: product.brand,
    category: product.category,
    description: product.description,
    price_amount: product.price?.amount?.toString() || '',
    price_currency: product.price?.currency || '',
    specifications: JSON.stringify(product.specifications),
    hero_image: product.images.hero || '',
    gallery_images: product.images.gallery.join(','),
    affiliate_links: JSON.stringify(product.affiliateLinks),
    pros: product.pros.join(','),
    cons: product.cons.join(','),
    review: product.review || '',
    manufacturer_name: product.manufacturerInfo.name,
    manufacturer_website: product.manufacturerInfo.website || '',
    manufacturer_support: product.manufacturerInfo.support || '',
    use_case: product.useCase.join(','),
  };
}

export function generateProductCSV(products: IProduct[]): string {
  const rows = products.map(formatProductForCSV);
  return Papa.unparse(rows);
}

export async function parseProductCSV(file: File): Promise<Partial<IProduct>[]> {
  return new Promise<Partial<IProduct>[]>((resolve, reject) => {
    Papa.parse<ProductCSVRow>(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header: string) => header.trim().toLowerCase(),
      complete: (results: Papa.ParseResult<ProductCSVRow>) => {
        try {
          const products = results.data.map((row): Partial<IProduct> => ({
            title: row.title,
            slug: row.slug,
            brand: row.brand,
            category: sanitizeCategory(row.category),
            description: row.description,
            specifications: parseSpecifications(row.specifications),
            price: row.price_amount
              ? {
                  amount: parseFloat(row.price_amount),
                  currency: row.price_currency || 'USD',
                }
              : undefined,
            images: {
              hero: row.hero_image,
              gallery: row.gallery_images?.split(',').map((url) => url.trim()).filter(Boolean) || [],
            },
            affiliateLinks: parseAffiliateLinks(row.affiliate_links),
            pros: row.pros?.split(',').map((pro) => pro.trim()).filter(Boolean) || [],
            cons: row.cons?.split(',').map((con) => con.trim()).filter(Boolean) || [],
            review: row.review,
            manufacturerInfo: {
              name: row.manufacturer_name,
              website: row.manufacturer_website,
              support: row.manufacturer_support,
            },
            useCase: sanitizeUseCase(row.use_case),
          }));
          resolve(products);
        } catch (error) {
          reject(new Error(`Failed to parse CSV: ${(error as Error).message}`));
        }
      },
      error: (error: Papa.ParseError) => {
        reject(new Error(`CSV parsing error: ${error.message}`));
      },
    });
  });
}
          title: row.title,
          brand: row.brand,
          category: row.category,
          description: row.description,
          price: row.price_amount
            ? {
                amount: parseFloat(row.price_amount),
                currency: row.price_currency || 'USD',
              }
            : undefined,
          specifications: parseSpecifications(row.specifications),
          images: {
            hero: row.hero_image,
            gallery: row.gallery_images?.split(',').map((url: string) => url.trim()) || [],
          },
          affiliateLinks: parseAffiliateLinks(row.affiliate_links),
          pros: row.pros?.split(',').map((pro: string) => pro.trim()) || [],
          cons: row.cons?.split(',').map((con: string) => con.trim()) || [],
          review: row.review,
          manufacturerInfo: {
            name: row.manufacturer_name,
            website: row.manufacturer_website,
            support: row.manufacturer_support,
          },
          useCase: row.use_case?.split(',').map((uc: string) => uc.trim()) || [],
        }));
        resolve(products);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}

function parseSpecifications(specs: string): Record<string, any> {
  if (!specs) return {};
  try {
    return JSON.parse(specs);
  } catch {
    return {};
  }
}

function parseAffiliateLinks(links: string): Array<{ platform: string; url: string; trackingId?: string }> {
  if (!links) return [];
  try {
    return JSON.parse(links);
  } catch {
    return [];
  }
}

export function generateProductCSV(products: IProduct[]): string {
  const rows = products.map((product) => ({
    title: product.title,
    brand: product.brand,
    category: product.category,
    description: product.description,
    price_amount: product.price?.amount,
    price_currency: product.price?.currency,
    specifications: JSON.stringify(product.specifications),
    hero_image: product.images.hero,
    gallery_images: product.images.gallery.join(','),
    affiliate_links: JSON.stringify(product.affiliateLinks),
    pros: product.pros.join(','),
    cons: product.cons.join(','),
    review: product.review,
    manufacturer_name: product.manufacturerInfo.name,
    manufacturer_website: product.manufacturerInfo.website,
    manufacturer_support: product.manufacturerInfo.support,
    use_case: product.useCase.join(','),
  }));

  return parse.unparse(rows);
}