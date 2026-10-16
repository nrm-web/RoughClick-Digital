import { NextResponse } from 'next/server';

const IS_PROD = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';

function getSessionSecret() {
  if (process.env.ADMIN_SESSION_SECRET) {
    return process.env.ADMIN_SESSION_SECRET;
  }
  if (IS_PROD) {
    return null;
  }
  return 'roughclick-secure-jwt-key-2026-b2b';
}

function base64UrlToUint8Array(base64Url) {
  try {
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  } catch (err) {
    return new Uint8Array(0);
  }
}

async function verifyToken(token) {
  if (!token || typeof token !== 'string') return false;
  const secret = getSessionSecret();
  if (!secret) return false;

  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [payloadBase64, providedSig] = parts;
  try {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const sigBuf = base64UrlToUint8Array(providedSig);
    if (sigBuf.length === 0) return false;

    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      sigBuf,
      enc.encode(payloadBase64)
    );

    if (!valid) return false;

    // Check expiration
    let base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const payloadStr = atob(base64);
    const data = JSON.parse(payloadStr);
    if (!data.exp || Date.now() > data.exp) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // 1. Protect Admin API Routes (/api/admin/inquiries, /api/admin-posts, etc.)
  if (pathname.startsWith('/api/admin')) {
    const sessionCookie = request.cookies.get('rc_admin_session')?.value;
    const isValid = await verifyToken(sessionCookie);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin authentication required' },
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
    const isValid = await verifyToken(sessionCookie);

    if (!isValid) {
      const loginUrl = new URL('/admin-blog/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin-blog',
    '/admin-blog/:path*',
    '/admin/inquiries',
    '/admin/inquiries/:path*',
    '/admin-inquiries',
    '/admin-inquiries/:path*',
    '/api/admin',
    '/api/admin/:path*'
  ]
};
