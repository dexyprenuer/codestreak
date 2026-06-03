import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import ChallengeCard from '@/components/challenge/ChallengeCard';

async function getChallenges(clerkId: string) {
  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) return [];
  return prisma.challenge.findMany({
    where: { userId: user.id },
    orderBy: [{ completed: 'asc' }, { createdAt: 'desc' }],
  });
}

export default async function ChallengesPage() {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error('Unauthorized');
  const challenges = await getChallenges(clerkId);

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden">
        <div aria-hidden className="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-purple-600/10 blur-3xl animate-blob pointer-events-none" />
        <h1 className="text-4xl font-bold tracking-tight glow-text-purple">Challenges</h1>
        <p className="text-zinc-400 mt-2">Your personalized coding challenges</p>
      </div>
      {challenges.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center animate-fade-up">
          <span className="text-4xl">🎯</span>
          <p className="text-zinc-400 text-sm mt-2">
            No challenges yet. Submit some code to get your first challenge!
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {challenges.map((challenge) => (
            <ChallengeCard challenge={challenge} key={challenge.id} />
          ))}
        </div>
      )}
    </div>
  );
}