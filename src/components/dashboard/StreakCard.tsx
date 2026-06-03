'use client';
import { Flame } from 'lucide-react';

interface StreakCardProps {
  streak: number;
  bestStreak: number;
}

export default function StreakCard({ streak, bestStreak }: StreakCardProps) {
  return (
    <div className="glass-card rounded-2xl p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 ease-spring shadow-glow-purple">
      {/* Ambient blob */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-violet-500/20 rounded-full blur-xl animate-pulse-glow pointer-events-none" aria-hidden="true" />
      <div className="flex flex-row items-center justify-between pb-2">
        <h3 className="text-sm font-medium">Current Streak</h3>
        <Flame className="h-4 w-4 text-orange-500" />
      </div>
      <div className="text-4xl font-bold glow-text-purple animate-float">
        {streak} <span className="text-lg font-normal">days</span>
      </div>
      <div className="mt-4 pt-4 border-t border-white/5">
        <p className="text-xs text-zinc-400">Best: {bestStreak} days</p>
      </div>
    </div>
  );
}