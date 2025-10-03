import { NextRequest } from 'next/server';
import { Product } from '@/lib/models';
import connectDB from '@/lib/db';
import { successResponse, errorResponse } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const useCase = searchParams.get('useCase');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    await connectDB();

    // Build filter query
    const filter: any = {};
    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (useCase) filter.useCase = useCase;
    if (minPrice || maxPrice) {
      filter['price.amount'] = {};
      if (minPrice) filter['price.amount'].$gte = parseInt(minPrice);
      if (maxPrice) filter['price.amount'].$lte = parseInt(maxPrice);
    }

    // Get total count for pagination
    const total = await Product.countDocuments(filter);

    // Get products with pagination and sorting
    const products = await Product.find(filter)
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return successResponse({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    return errorResponse(error.message);
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const data = await request.json();

    // Create slug from title
    data.slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const product = await Product.create(data);
    return successResponse(product);
  } catch (error: any) {
    return errorResponse(error.message);
  }
}