// src/components/history/SubmissionList.tsx
'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Submission {
  id: string;
  language: string;
  score: number;
  createdAt: Date;
}

interface SubmissionListProps {
  submissions: Submission[];
}

function getScoreBadgeVariant(score: number): 'success' | 'warning' | 'destructive' {
  if (score >= 80) return 'success';
  if (score >= 50) return 'warning';
  return 'destructive';
}

export default function SubmissionList({ submissions }: SubmissionListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [details, setDetails] = useState<Record<string, any>>({});

  const fetchDetails = async (id: string) => {
    if (details[id]) return;
    const res = await fetch(`/api/submissions/${id}`);
    const data = await res.json();
    if (data.success) setDetails(prev => ({ ...prev, [id]: data.data }));
  };

  const toggleExpand = async (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      await fetchDetails(id);
    }
  };

  if (submissions.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-12 text-center animate-fade-up">
        <span className="text-4xl">📭</span>
        <p className="text-zinc-400 text-sm mt-2">No submissions yet. Start by analyzing some code!</p>
      </div>
    );
  }

  const scoreBadgeClasses = (variant: 'success' | 'warning' | 'destructive') => {
    const base = 'px-2.5 py-1 rounded-lg text-xs font-bold border';
    switch (variant) {
      case 'success':
        return `${base} bg-green-500/10 border-green-500/30 text-green-400`;
      case 'warning':
        return `${base} bg-yellow-500/10 border-yellow-500/30 text-yellow-400`;
      case 'destructive':
        return `${base} bg-red-500/10 border-red-500/30 text-red-400`;
    }
  };

  return (
    <div className="space-y-3 no-scrollbar">
      {submissions.map((sub) => {
        const variant = getScoreBadgeVariant(sub.score);
        const isExpanded = expandedId === sub.id;
        const detail = details[sub.id];

        return (
          <div
            key={sub.id}
            className="glass-card rounded-2xl overflow-hidden transition-all duration-300 ease-smooth"
          >
            <div
              onClick={() => toggleExpand(sub.id)}
              className="flex items-center justify-between px-5 py-4 cursor-pointer group hover:bg-white/5 transition-colors duration-200"
            >
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white/5 border border-white/10 text-zinc-300 capitalize">
                  {sub.language}
                </span>
                <span className={scoreBadgeClasses(variant)}>
                  {sub.score.toFixed(1)}/100
                </span>
                <span className="text-xs text-zinc-500">
                  {formatDistanceToNow(new Date(sub.createdAt), { addSuffix: true })}
                </span>
              </div>
              {isExpanded ? (
                <ChevronUp className="h-4 w-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
              ) : (
                <ChevronDown className="h-4 w-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
              )}
            </div>

            {isExpanded && detail && (
              <div className="border-t border-white/5 px-5 py-5 space-y-4 animate-fade-up">
                <div>
                  <h4 className="font-semibold mb-1 text-zinc-200">Summary</h4>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {detail.feedback.summary}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-1 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-400" />
                      Strengths
                    </h4>
                    <ul className="space-y-1">
                      {detail.feedback.strengths.map((s: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-zinc-300 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-yellow-400" />
                      Weaknesses
                    </h4>
                    <ul className="space-y-1">
                      {detail.feedback.weaknesses.map((w: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-zinc-300 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5 shrink-0" />
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-violet-400" />
                    Suggestions
                  </h4>
                  <ul className="space-y-1">
                    {detail.feedback.suggestions.map((s: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-zinc-300 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {isExpanded && !detail && (
              <div className="px-5 py-6 flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-violet-500/30 border-t-violet-400 animate-spin" />
                <span className="text-zinc-400 text-sm animate-pulse-glow">
                  Loading details…
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}