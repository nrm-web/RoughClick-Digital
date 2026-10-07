import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getInquiries, deleteInquiry } from '@/lib/db';
import { ADMIN_COOKIE_NAME, verifySessionToken } from '@/lib/auth/session';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function checkAdminAuth() {
  const cookieStore = cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export async function GET() {
  try {
    if (!checkAdminAuth()) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin login required' },
        { status: 401 }
      );
    }

    const inquiries = await getInquiries();
    return NextResponse.json({
      success: true,
      count: inquiries.length,
      inquiries
    });
  } catch (error) {
    console.error('[Admin Inquiries API] Error fetching inquiries:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    if (!checkAdminAuth()) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin login required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    let id = searchParams.get('id');

    if (!id) {
      const body = await request.json().catch(() => ({}));
      id = body.id;
    }

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Inquiry ID is required' },
        { status: 400 }
      );
    }

    await deleteInquiry(id);
    return NextResponse.json({
      success: true,
      message: `Inquiry ${id} deleted successfully`
    });
  } catch (error) {
    console.error('[Admin Inquiries API] Error deleting inquiry:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete inquiry' },
      { status: 500 }
    );
  }
}
