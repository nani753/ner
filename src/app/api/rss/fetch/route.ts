import { NextResponse } from 'next/server';
import { fetchAllRSSFeeds } from '@/lib/rss';
import { requireAdmin } from '@/lib/auth-utils';

export async function POST() {
  try {
    await requireAdmin();
    const result = await fetchAllRSSFeeds();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch RSS feeds' },
      { status: 500 }
    );
  }
}