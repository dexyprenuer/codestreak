// src/app/(protected)/history/page.tsx
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import SubmissionList from '@/components/history/SubmissionList';

async function getSubmissions(clerkId: string) {
  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) return [];
  return prisma.submission.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    take: 100,
    select: { id: true, language: true, score: true, createdAt: true },
  });
}

export default async function HistoryPage() {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error('Unauthorized');
  const submissions = await getSubmissions(clerkId);

  return (
    <div className="relative overflow-hidden">
      <div aria-hidden className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl animate-blob-slow pointer-events-none" />
      <div>
        <h1 className="glow-text-cyan text-4xl font-bold tracking-tight">History</h1>
        <p className="text-zinc-400 mt-2">View all your past code submissions and analyses</p>
      </div>
      <SubmissionList submissions={submissions} />
    </div>
  );
}