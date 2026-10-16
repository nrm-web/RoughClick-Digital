import crypto from 'crypto';

export const ADMIN_COOKIE_NAME = 'rc_admin_session';

const IS_PROD = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';

/**
 * Secret key for HMAC signing: fail-closed in production if not explicitly configured
 */
export function getSessionSecret() {
  if (process.env.ADMIN_SESSION_SECRET) {
    return process.env.ADMIN_SESSION_SECRET;
  }
  if (IS_PROD) {
    // Fail-closed in production: do not fallback to published/hardcoded secret
    return null;
  }
  return 'roughclick-secure-jwt-key-2026-b2b';
}

/**
 * Admin credentials (fail-closed in production if not explicitly set)
 */
export function getAdminCredentials() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (IS_PROD && (!email || !password)) {
    // Fail-closed in production: credentials must be provided via environment variables
    return { email: null, password: null, configured: false };
  }

  return {
    email: email || 'admin@roughclick.com',
    password: password || 'roughclick2026!',
    configured: true
  };
}

/**
 * Validate credentials submitted by user
 */
export function validateCredentials(email, password) {
  if (!email || !password) return false;
  const creds = getAdminCredentials();
  if (!creds.configured || !creds.email || !creds.password) {
    return false;
  }
  return (
    email.trim().toLowerCase() === creds.email.toLowerCase() &&
    password === creds.password
  );
}

/**
 * Sign session data using HMAC SHA-256
 */
export function createSessionToken(userPayload) {
  const secret = getSessionSecret();
  if (!secret) {
    throw new Error('FAIL-CLOSED: ADMIN_SESSION_SECRET must be configured in production environments.');
  }
  const creds = getAdminCredentials();
  const effectivePayload = userPayload || { email: creds.email || 'admin@roughclick.com', role: 'admin' };
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
  const data = {
    ...effectivePayload,
    exp: expiresAt
  };

  const payloadBase64 = Buffer.from(JSON.stringify(data)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', secret)
    .update(payloadBase64)
    .digest('base64url');

  return `${payloadBase64}.${signature}`;
}

/**
 * Verify session token string
 */
export function verifySessionToken(token) {
  if (!token || typeof token !== 'string') return null;

  const secret = getSessionSecret();
  if (!secret) return null;

  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [payloadBase64, providedSig] = parts;

  const expectedSig = crypto
    .createHmac('sha256', secret)
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
