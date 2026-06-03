import { prisma } from '@/lib/prisma';
import { toDateOnly, addDays, isSameDay } from '@/lib/utils';

export type StreakResult =
| { action: 'same_day' }
| { action: 'continue'; streak: number }
| { action: 'reset' };

export function computeStreak(
currentStreak: number,
lastSubmittedAt: Date | null,
now: Date = new Date()
): StreakResult {
if (!lastSubmittedAt) {
return { action: 'reset' };
}

const lastDate = toDateOnly(lastSubmittedAt);
const today = toDateOnly(now);

if (isSameDay(lastDate, today)) {
return { action: 'same_day' };
}

const yesterday = toDateOnly(addDays(now, -1));
if (isSameDay(lastDate, yesterday)) {
return { action: 'continue', streak: currentStreak };
}

return { action: 'reset' };
}

export async function updateStreakAfterSubmission(userId: string): Promise<number> {
const user = await prisma.user.findUnique({ where: { id: userId } });
if (!user) throw new Error('User not found');

const result = computeStreak(user.streak, user.lastSubmittedAt);

if (result.action === 'same_day') {
await prisma.user.update({
where: { id: userId },
data: { lastSubmittedAt: new Date() },
});
return user.streak;
}

if (result.action === 'continue') {
const newStreak = result.streak + 1;
await prisma.user.update({
where: { id: userId },
data: {
streak: newStreak,
bestStreak: Math.max(user.bestStreak, newStreak),
lastSubmittedAt: new Date(),
},
});
return newStreak;
}

// action === 'reset'
const newStreak = 1;
await prisma.user.update({
where: { id: userId },
data: {
streak: newStreak,
bestStreak: Math.max(user.bestStreak, 1),
lastSubmittedAt: new Date(),
},
});
return newStreak;
}
