import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect /admin-blog, /admin/inquiries, and /admin-inquiries (allowing /admin-blog/login to pass through)
  const isProtectedAdminRoute =
    (pathname.startsWith('/admin-blog') && pathname !== '/admin-blog/login') ||
    pathname.startsWith('/admin/inquiries') ||
    pathname.startsWith('/admin-inquiries');

  if (isProtectedAdminRoute) {
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
    '/admin-inquiries/:path*'
  ]
};
