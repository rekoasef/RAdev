import { createHmac, timingSafeEqual } from 'crypto';

const SECRET = () => {
  const s = process.env.ADMIN_JWT_SECRET;
  if (!s) throw new Error('ADMIN_JWT_SECRET is not set');
  return s;
};

export function createSessionToken(): string {
  const timestamp = Date.now().toString();
  const hmac = createHmac('sha256', SECRET()).update(timestamp).digest('hex');
  return `${timestamp}.${hmac}`;
}

export function verifySessionToken(token: string): boolean {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [timestamp, hmac] = parts;

  // Check expiry (30 days)
  const age = Date.now() - parseInt(timestamp, 10);
  if (isNaN(age) || age < 0 || age > 30 * 24 * 60 * 60 * 1000) return false;

  // Verify HMAC with timing-safe comparison
  const expected = createHmac('sha256', SECRET()).update(timestamp).digest('hex');
  try {
    return timingSafeEqual(Buffer.from(hmac), Buffer.from(expected));
  } catch {
    return false;
  }
}
