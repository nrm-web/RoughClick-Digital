import { NextResponse } from 'next/server';
import { validateCredentials, createSessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth/session';
import { checkRateLimit } from '@/lib/rateLimit';

export async function POST(request) {
  try {
    // 1. Rate Limiting Check (Max 5 attempts per minute per IP)
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';
    const rate = checkRateLimit(`login_${ip}`, 5, 60000);

    if (!rate.allowed) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please wait a minute before trying again.' },
        {
          status: 429,
          headers: {
            'Retry-After': '60',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.ceil(rate.resetTime / 1000))
          }
        }
      );
    }

    // 2. Payload size bounds (reject payloads > 16KB)
    const contentLength = parseInt(request.headers.get('content-length') || '0', 10);
    if (contentLength > 16384) {
      return NextResponse.json(
        { error: 'Payload too large' },
        { status: 413 }
      );
    }

    const body = await request.json();
    const { email, password } = body;

    if (!validateCredentials(email, password)) {
      return NextResponse.json(
        { error: 'Invalid credentials. Please verify your admin email and password.' },
        { status: 401 }
      );
    }

    const token = createSessionToken({ email: email.trim(), role: 'admin' });

    const response = NextResponse.json({
      success: true,
      user: { email: email.trim(), role: 'admin' }
    });

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    return response;
  } catch (err) {
    console.error('[Auth API] Login error:', err);
    return NextResponse.json({ error: 'Server authentication failure' }, { status: 500 });
  }
}
