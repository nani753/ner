import { NextRequest } from 'next/server';
import { generateProductCSV, parseProductCSV } from '@/lib/csv';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Product } from '@/lib/models';
import { errorResponse, successResponse } from '@/lib/utils';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.role?.includes('admin')) {
    return errorResponse('Unauthorized', 401);
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return errorResponse('No file provided');
    }

    const products = await parseProductCSV(file);
    const savedProducts = await Product.insertMany(products);

    return successResponse({ imported: savedProducts.length });
  } catch (error) {
    return errorResponse((error as Error).message);
  }
}

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.role?.includes('admin')) {
    return errorResponse('Unauthorized', 401);
  }

  try {
    const products = await Product.find({});
    const csv = generateProductCSV(products);

    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="products.csv"',
      },
    });
  } catch (error) {
    return errorResponse((error as Error).message);
  }
}