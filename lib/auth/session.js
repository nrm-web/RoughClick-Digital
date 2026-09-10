import crypto from 'crypto';

export const ADMIN_COOKIE_NAME = 'rc_admin_session';

// Secret key for HMAC signing, fallback to deterministic salt for local dev
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'roughclick-secure-jwt-key-2026-b2b';

// Admin credentials (configurable via environment variables)
const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@roughclick.com';
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'roughclick2026!';

/**
 * Validate credentials submitted by user
 */
export function validateCredentials(email, password) {
  if (!email || !password) return false;
  return (
    email.trim().toLowerCase() === DEFAULT_ADMIN_EMAIL.toLowerCase() &&
    password === DEFAULT_ADMIN_PASSWORD
  );
}

/**
 * Sign session data using HMAC SHA-256
 */
export function createSessionToken(userPayload = { email: DEFAULT_ADMIN_EMAIL, role: 'admin' }) {
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
  const data = {
    ...userPayload,
    exp: expiresAt
  };

  const payloadBase64 = Buffer.from(JSON.stringify(data)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payloadBase64)
    .digest('base64url');

  return `${payloadBase64}.${signature}`;
}

/**
 * Verify session token string
 */
export function verifySessionToken(token) {
  if (!token || typeof token !== 'string') return null;

  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [payloadBase64, providedSig] = parts;

  const expectedSig = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payloadBase64)
    .digest('base64url');

  // Constant-time comparison to prevent timing attacks
  const providedBuf = Buffer.from(providedSig);
  const expectedBuf = Buffer.from(expectedSig);

  if (providedBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(providedBuf, expectedBuf)) {
    return null;
  }

  try {
    const data = JSON.parse(Buffer.from(payloadBase64, 'base64url').toString('utf-8'));
    if (!data.exp || Date.now() > data.exp) {
      return null; // Expired
    }
    return data;
  } catch (err) {
    return null;
  }
}
