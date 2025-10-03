import { NextRequest } from 'next/server';
import { Product } from '@/lib/models';
import connectDB from '@/lib/db';
import { successResponse, errorResponse } from '@/lib/utils';
import { requireAdmin } from '@/lib/auth-utils';

interface RouteParams {
  params: {
    slug: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    const product = await Product.findOne({ slug: params.slug });
    
    if (!product) {
      return errorResponse('Product not found', 404);
    }

    return successResponse(product);
  } catch (error: any) {
    return errorResponse(error.message);
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAdmin();
    await connectDB();

    const data = await request.json();
    const product = await Product.findOneAndUpdate(
      { slug: params.slug },
      { $set: data },
      { new: true }
    );

    if (!product) {
      return errorResponse('Product not found', 404);
    }

    return successResponse(product);
  } catch (error: any) {
    return errorResponse(error.message);
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAdmin();
    await connectDB();

    const product = await Product.findOneAndDelete({ slug: params.slug });

    if (!product) {
      return errorResponse('Product not found', 404);
    }

    return successResponse({ message: 'Product deleted successfully' });
  } catch (error: any) {
    return errorResponse(error.message);
  }
}