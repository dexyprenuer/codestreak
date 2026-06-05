import { auth, clerkClient } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { DashboardStats } from '@/types/dashboard';
import StreakCard from '@/components/dashboard/StreakCard';
import StatsCard from '@/components/dashboard/StatsCard';
import ScoreTrend from '@/components/dashboard/ScoreTrend';
import Link from 'next/link';

async function getDashboardData(clerkId: string) {
  try {
    let user = await prisma.user.findUnique({
      where: { clerkId },
      include: {
        submissions: { orderBy: { createdAt: 'desc' }, take: 7, select: { score: true, createdAt: true } },
        challenges: { where: { completed: false }, orderBy: { createdAt: 'desc' }, take: 1 },
      },
    });

    if (!user) {
      const clerkUser = await clerkClient.users.getUser(clerkId);
      const email = clerkUser.emailAddresses[0]?.emailAddress || `${clerkId}@temp.com`;
      user = await prisma.user.create({
        data: { clerkId, email, streak: 0, bestStreak: 0 },
        include: {
          submissions: { orderBy: { createdAt: 'desc' }, take: 7, select: { score: true, createdAt: true } },
          challenges: { where: { completed: false }, orderBy: { createdAt: 'desc' }, take: 1 },
        },
      });
    }

    const totalSubmissions = await prisma.submission.count({ where: { userId: user.id } });
    const challengesCompleted = await prisma.challenge.count({ where: { userId: user.id, completed: true } });
    const challengesTotal = await prisma.challenge.count({ where: { userId: user.id } });
    const avgScoreAgg = await prisma.submission.aggregate({ where: { userId: user.id }, _avg: { score: true } });
    const recentScores = user.submissions.map(s => s.score).reverse();

    const stats: DashboardStats = {
      streak: user.streak,
      bestStreak: user.bestStreak,
      totalSubmissions,
      averageScore: avgScoreAgg._avg.score || 0,
      challengesCompleted,
      challengesTotal,
      recentScores,
    };

    return { user, stats, activeChallenge: user.challenges[0] || null };
  } catch (error) {
    console.error('[getDashboardData]', error);
    throw new Error('Failed to load dashboard data');
  }
}

export default async function DashboardPage() {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error('Unauthorized');
  const { stats, activeChallenge } = await getDashboardData(clerkId);

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden">
        <div className="absolute -top-16 -left-16 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl animate-pulse-glow pointer-events-none" aria-hidden="true" />
        <h1 className="text-4xl font-bold tracking-tight glow-text-purple relative">Dashboard</h1>
        <p className="text-zinc-400 mt-1 relative">Track your coding journey and maintain your streak.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StreakCard streak={stats.streak} bestStreak={stats.bestStreak} />
        <StatsCard title="Total Submissions" value={stats.totalSubmissions} />
        <StatsCard title="Average Score" value={stats.averageScore.toFixed(1)} suffix="/100" />
        <StatsCard title="Challenges Completed" value={`${stats.challengesCompleted}/${stats.challengesTotal}`} />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <ScoreTrend scores={stats.recentScores} />
        <div className="glass-card rounded-2xl p-6 flex flex-col gap-4">
          <h3 className="text-sm font-medium">Quick Actions</h3>
          <p className="text-sm text-zinc-400 -mt-2">Continue your growth momentum</p>
          <Link href="/analyze" className="inline-flex items-center justify-center rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium py-2.5 px-4 shadow-glow-purple transition-colors">
            Analyze New Code
          </Link>
          {activeChallenge && (
            <Link href="/challenges" className="inline-flex items-center justify-center rounded-lg border border-white/10 hover:border-violet-500/50 bg-white/5 text-white font-medium py-2.5 px-4 transition-colors">
              Continue Current Challenge
            </Link>
          )}
        </div>
      </div>
      {activeChallenge && (
        <div className="glass-card-strong rounded-2xl p-6 border border-violet-500/20 shadow-glow-purple animate-fade-up">
          <h3 className="text-sm font-medium text-violet-300">🔥 AI Active Challenge</h3>
          <p className="text-xs text-zinc-400 mt-1">Continue where you left off</p>
          <h3 className="text-xl font-semibold mt-4">{activeChallenge.title}</h3>
          <p className="text-zinc-400 mt-2">{activeChallenge.description}</p>
          <Link href="/challenges" className="inline-block mt-4 text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors">
            View Challenge →
          </Link>
        </div>
      )}
    </div>
  );
}