import { NextRequest } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
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

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return errorResponse('File must be an image');
    }

    // Generate unique filename
    const buffer = await file.arrayBuffer();
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const filename = `${uniqueSuffix}-${file.name.toLowerCase().replace(/[^a-z0-9.]/g, '-')}`;
    const relativePath = `/uploads/${filename}`;
    const absolutePath = join(process.cwd(), 'public', 'uploads', filename);

    // Save file
    await writeFile(absolutePath, Buffer.from(buffer));

    return successResponse({ url: relativePath });
  } catch (error) {
    console.error('Image upload error:', error);
    return errorResponse((error as Error).message);
  }
}