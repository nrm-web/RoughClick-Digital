/**
 * In-memory sliding window rate limiter for public endpoints (RC-05)
 * Protects against brute-force attacks and volumetric request abuse.
 */

const rateLimitMap = new Map();

// Periodic garbage collection to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitMap.entries()) {
      if (now > record.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }, 60000); // Clean every minute
}

/**
 * Check if a client IP has exceeded the allowed requests limit.
 * 
 * @param {string} ip - Client identifier (IP address)
 * @param {number} maxRequests - Max requests allowed in window
 * @param {number} windowMs - Window duration in milliseconds (default 60,000ms = 1 min)
 * @returns {{ allowed: boolean, remaining: number, resetTime: number }}
 */
export function checkRateLimit(ip = 'unknown', maxRequests = 10, windowMs = 60000) {
  const now = Date.now();
  const key = `${ip}`;

  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + windowMs
    });
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetTime: now + windowMs
    };
  }

  if (record.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime
    };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetTime: record.resetTime
  };
}
