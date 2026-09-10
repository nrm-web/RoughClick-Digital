import { NextResponse } from 'next/server';
import { validateCredentials, createSessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth/session';

export async function POST(request) {
  try {
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
