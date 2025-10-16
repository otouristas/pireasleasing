import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Rate limiting configuration for API routes
 * Uses Upstash Redis for serverless-friendly rate limiting
 */

// Create Redis client (only if credentials are available)
let redis: Redis | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

// Rate limiters for different endpoints
export const rateLimiters = {
  // Booking: 5 requests per 10 minutes per IP
  booking: redis ? new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "10 m"),
    analytics: true,
    prefix: "ratelimit:booking",
  }) : null,

  // Contact form: 3 requests per 10 minutes per IP
  contact: redis ? new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, "10 m"),
    analytics: true,
    prefix: "ratelimit:contact",
  }) : null,

  // API general: 100 requests per minute per IP
  api: redis ? new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, "1 m"),
    analytics: true,
    prefix: "ratelimit:api",
  }) : null,

  // Authentication: 5 attempts per 15 minutes per IP
  auth: redis ? new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "15 m"),
    analytics: true,
    prefix: "ratelimit:auth",
  }) : null,
};

/**
 * Check rate limit for a request
 * @param identifier - Usually IP address or user ID
 * @param limiter - Which rate limiter to use
 * @returns {success: boolean, limit: number, remaining: number, reset: number}
 */
export async function checkRateLimit(
  identifier: string,
  limiterType: keyof typeof rateLimiters
) {
  const limiter = rateLimiters[limiterType];

  // If no Redis configured, allow all requests (development mode)
  if (!limiter) {
    console.warn(`Rate limiting not configured for ${limiterType}. Allowing request.`);
    return {
      success: true,
      limit: 1000,
      remaining: 999,
      reset: Date.now() + 60000,
    };
  }

  const { success, limit, remaining, reset } = await limiter.limit(identifier);

  return {
    success,
    limit,
    remaining,
    reset,
  };
}

/**
 * Get client IP address from request headers
 */
export function getClientIp(request: Request): string {
  const headers = request.headers;
  
  // Try different header possibilities
  const forwardedFor = headers.get('x-forwarded-for');
  const realIp = headers.get('x-real-ip');
  const cfConnectingIp = headers.get('cf-connecting-ip');
  
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  if (realIp) {
    return realIp;
  }
  
  if (cfConnectingIp) {
    return cfConnectingIp;
  }
  
  // Fallback
  return 'unknown';
}

/**
 * Create rate limit response
 */
export function createRateLimitResponse(reset: number) {
  const resetDate = new Date(reset);
  
  return new Response(
    JSON.stringify({
      error: 'Too many requests',
      message: 'You have exceeded the rate limit. Please try again later.',
      retryAfter: resetDate.toISOString(),
    }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': Math.ceil((reset - Date.now()) / 1000).toString(),
        'X-RateLimit-Reset': resetDate.toISOString(),
      },
    }
  );
}

