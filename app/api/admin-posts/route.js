import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ADMIN_COOKIE_NAME, verifySessionToken } from '@/lib/auth/session';
import { getAllPostsAdmin, savePost, deletePost } from '@/lib/db';
import { revalidatePath } from 'next/cache';

/**
 * Middleware helper to ensure caller is authenticated admin
 */
function checkAuth() {
  const cookieStore = cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function GET() {
  const session = checkAuth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  try {
    const data = await getAllPostsAdmin();
    return NextResponse.json(data);
  } catch (err) {
    console.error('[Admin Posts API] Error fetching posts:', err);
    return NextResponse.json({ error: 'Failed to retrieve posts' }, { status: 500 });
  }
}

export async function POST(request) {
  const session = checkAuth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.title || !body.title.trim()) {
      return NextResponse.json({ error: 'Post title is required' }, { status: 400 });
    }

    const saved = await savePost(body);

    // Revalidate public blog cache if published
    try {
      revalidatePath('/blog');
      if (saved.slug) {
        revalidatePath(`/blog/${saved.slug}`);
      }
      revalidatePath('/sitemap.xml');
    } catch (e) {
      // Revalidation is non-blocking
    }

    return NextResponse.json({ success: true, post: saved });
  } catch (err) {
    console.error('[Admin Posts API] Error saving post:', err);
    return NextResponse.json({ error: 'Failed to save post' }, { status: 500 });
  }
}

export async function DELETE(request) {
  const session = checkAuth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }

    const success = await deletePost(id);
    if (!success) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    try {
      revalidatePath('/blog');
    } catch (e) {}

    return NextResponse.json({ success: true, message: 'Post removed' });
  } catch (err) {
    console.error('[Admin Posts API] Error deleting post:', err);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
