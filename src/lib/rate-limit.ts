import { redis } from './redis';

const DAILY_LIMIT = 5;

function getEndOfDayTimestamp(): number {
  const now = new Date();
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);
  return Math.floor(endOfDay.getTime() / 1000);
}

export async function checkRateLimit(userId: string): Promise<{
  allowed: boolean;
  remaining: number;
  used: number;
}> {
  const today = new Date().toISOString().split('T')[0];
  const key = `rate_limit:${userId}:${today}`;

  const current = await redis.get<string>(key);
  const used = current ? parseInt(current, 10) : 0;

  if (used >= DAILY_LIMIT) {
    return { allowed: false, remaining: 0, used };
  }

  return { allowed: true, remaining: DAILY_LIMIT - used, used };
}

export async function incrementRateLimit(userId: string): Promise<void> {
  const today = new Date().toISOString().split('T')[0];
  const key = `rate_limit:${userId}:${today}`;

  await redis.incr(key);
  await redis.expireat(key, getEndOfDayTimestamp());
}