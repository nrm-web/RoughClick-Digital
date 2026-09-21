import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // 1. Protect Admin API Routes (/api/admin/inquiries, etc.)
  if (pathname.startsWith('/api/admin')) {
    const sessionCookie = request.cookies.get('rc_admin_session')?.value;
    if (!sessionCookie) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin login required' },
        { status: 401 }
      );
    }
  }

  // 2. Protect Admin UI Pages (/admin/inquiries, /admin-inquiries, /admin-blog)
  const isProtectedAdminPage =
    (pathname.startsWith('/admin-blog') && pathname !== '/admin-blog/login') ||
    pathname.startsWith('/admin/inquiries') ||
    pathname.startsWith('/admin-inquiries');

  if (isProtectedAdminPage) {
    const sessionCookie = request.cookies.get('rc_admin_session')?.value;

    if (!sessionCookie) {
      const loginUrl = new URL('/admin-blog/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin-blog/:path*',
    '/admin/inquiries/:path*',
    '/admin-inquiries/:path*',
    '/api/admin/:path*'
  ]
};
