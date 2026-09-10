import { NextResponse } from 'next/server';
import { getPublishedPosts } from '@/lib/db';

export async function GET() {
  try {
    const posts = await getPublishedPosts();
    return NextResponse.json({ posts });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to retrieve posts' }, { status: 500 });
  }
}
