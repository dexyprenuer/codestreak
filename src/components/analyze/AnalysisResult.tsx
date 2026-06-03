// src/components/analyze/AnalysisResult.tsx
'use client';

import { useState } from 'react';
import { AnalysisResult as AnalysisResultType } from '@/types/analysis';

interface AnalysisResultProps {
  result: AnalysisResultType;
}

function getScoreColor(score: number): string {
  if (score >= 80) return 'bg-green-600';
  if (score >= 50) return 'bg-yellow-600';
  return 'bg-red-600';
}

export default function AnalysisResult({ result }: AnalysisResultProps) {
  const { feedback, challenge } = result;
  const score = feedback.score;
  const [hintsOpen, setHintsOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="glass-card-strong rounded-2xl p-6 space-y-6 animate-fade-up">
        <div>
          <p className="glow-text-cyan text-lg font-semibold">Analysis Results</p>
          <p className="text-zinc-400 text-sm">AI-powered feedback on your submission</p>
        </div>

        <div className="flex items-center gap-5">
          <div className="relative w-20 h-20 flex-shrink-0">
            <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
              <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
              <circle
                cx="40" cy="40" r="34"
                fill="none"
                stroke={score >= 80 ? '#4ade80' : score >= 50 ? '#facc15' : '#f87171'}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${(score / 100) * 213.6} 213.6`}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-lg font-black text-white">{score.toFixed(0)}</span>
          </div>
          <div>
            <p className="text-white font-bold text-lg">Overall Score</p>
            <p className="text-zinc-400 text-sm">{score.toFixed(1)}/100</p>
          </div>
        </div>

        <div>
          <p className="text-white font-semibold mb-2">Summary</p>
          <p className="text-zinc-300 leading-relaxed">{feedback.summary}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-white font-semibold mb-2 text-green-400">Strengths</p>
            <ul className="space-y-2">
              {feedback.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-zinc-300 text-sm">
                  <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0 bg-green-400" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-white font-semibold mb-2 text-yellow-400">Weaknesses</p>
            <ul className="space-y-2">
              {feedback.weaknesses.map((w, i) => (
                <li key={i} className="flex items-start gap-2 text-zinc-300 text-sm">
                  <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0 bg-yellow-400" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <p className="text-white font-semibold mb-2">Suggestions</p>
          <ul className="space-y-2">
            {feedback.suggestions.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-zinc-300 text-sm">
                <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0 bg-violet-400" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-white font-semibold mb-3">Topics to Study Next</p>
          <div className="flex flex-wrap gap-2">
            {feedback.nextTopics.map((topic, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-zinc-300 hover:border-violet-500/40 transition-colors"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6 animate-fade-up">
        <p className="glow-text-purple text-lg font-semibold">Next Challenge</p>
        <p className="text-zinc-400 text-sm mb-4">Personalized for your growth</p>

        <span
          className={`px-3 py-1 rounded-full text-xs font-bold border ${
            challenge.difficulty === 'Beginner'
              ? 'bg-green-500/10 border-green-500/30 text-green-400'
              : challenge.difficulty === 'Advanced'
              ? 'bg-red-500/10 border-red-500/30 text-red-400'
              : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
          }`}
        >
          {challenge.difficulty}
        </span>

        <h3 className="text-xl font-bold text-white mt-3 mb-2">{challenge.title}</h3>
        <p className="text-zinc-300 text-sm leading-relaxed mb-4">{challenge.description}</p>

        <button
          onClick={() => setHintsOpen(p => !p)}
          className="flex items-center gap-2 text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors"
        >
          Show Hints
          <span className={`transition-transform duration-300 ${hintsOpen ? 'rotate-180' : ''}`}>▾</span>
        </button>
        <div className={`overflow-hidden transition-all duration-300 ease-smooth ${hintsOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
          <ul className="space-y-2">
            {challenge.hints.map((hint, i) => (
              <li key={i} className="flex items-start gap-2 text-zinc-300 text-sm">
                <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0 bg-violet-400" />
                {hint}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}