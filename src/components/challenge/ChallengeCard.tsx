'use client';

import { useState } from 'react';
import { Challenge } from '@prisma/client';
import { CheckCircle2, Circle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ChallengeCardProps {
  challenge: Challenge;
}

export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [hintsOpen, setHintsOpen] = useState(false);

  const handleToggleComplete = async () => {
    setIsUpdating(true);
    try {
      await fetch(`/api/challenges/${challenge.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !challenge.completed }),
      });
      router.refresh();
    } catch (error) {
      console.error('Failed to update challenge', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const hints = challenge.hints as string[];

  const difficultyClasses = {
    Beginner: 'px-2 py-0.5 rounded-full text-xs font-bold bg-green-500/10 border border-green-500/30 text-green-400',
    Intermediate: 'px-2 py-0.5 rounded-full text-xs font-bold bg-yellow-500/10 border border-yellow-500/30 text-yellow-400',
    Advanced: 'px-2 py-0.5 rounded-full text-xs font-bold bg-red-500/10 border border-red-500/30 text-red-400',
  }[challenge.difficulty] || '';

  return (
    <div className={`glass-card rounded-2xl p-6 transition-all duration-300 ease-smooth group ${
      challenge.completed
        ? 'opacity-60 border border-cyan-500/20 shadow-glow-cyan'
        : 'hover:-translate-y-1 border border-violet-500/20 shadow-glow-purple'
    }`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            {challenge.completed ? (
              <CheckCircle2 className="h-5 w-5 text-cyan-400" />
            ) : (
              <Circle className="h-5 w-5 text-zinc-500" />
            )}
            <h3 className="text-white font-bold text-lg leading-snug">{challenge.title}</h3>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className={difficultyClasses}>{challenge.difficulty}</span>
            <span className="text-xs text-zinc-500 capitalize">{challenge.language}</span>
          </div>
        </div>
        <button
          onClick={handleToggleComplete}
          disabled={isUpdating}
          className={challenge.completed
            ? 'px-3 py-1.5 rounded-xl text-xs font-semibold border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 transition-all duration-200 disabled:opacity-40'
            : 'px-3 py-1.5 rounded-xl text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white shadow-glow-purple transition-all duration-200 disabled:opacity-40'
          }
        >
          {challenge.completed ? 'Undo' : 'Mark Complete'}
        </button>
      </div>
      <p className="text-zinc-300 text-sm leading-relaxed mt-4 mb-4">{challenge.description}</p>
      <div>
        <button
          onClick={() => setHintsOpen(p => !p)}
          className="flex items-center gap-2 text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors"
        >
          <span className={`inline-block transition-transform duration-300 ${hintsOpen ? 'rotate-180' : ''}`}>▾</span>
          Hints
        </button>
        <div className={`overflow-hidden transition-all duration-300 ease-smooth ${hintsOpen ? 'max-h-64 mt-3' : 'max-h-0'}`}>
          <ul className="list-none space-y-2">
            {hints.map((hint, i) => (
              <li key={i} className="flex items-start gap-2 text-zinc-300 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 flex-shrink-0" />
                {hint}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}