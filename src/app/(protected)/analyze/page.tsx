// src/app/(protected)/analyze/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CodeEditor from '@/components/analyze/CodeEditor';
import LanguageSelector from '@/components/analyze/LanguageSelector';
import AnalysisResult from '@/components/analyze/AnalysisResult';
import { AnalysisResult as AnalysisResultType } from '@/types/analysis';

export default function AnalyzePage() {
  const router = useRouter();
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResultType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!code.trim()) { setError('Please enter some code'); return; }
    setIsLoading(true); setError(null); setResult(null);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, code }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Analysis failed');
      setResult(data.data);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden space-y-8">
      <div aria-hidden className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl animate-blob-slow pointer-events-none" />
      <div>
        <h1 className="glow-text-cyan text-4xl font-bold tracking-tight">Analyze Code</h1>
        <p className="text-zinc-400 mt-2">Submit your code for AI-powered feedback and a personalized challenge.</p>
      </div>
      <div className="glass-card rounded-2xl p-6 space-y-5">
        <div>
          <p className="glow-text-purple text-lg font-semibold">Code Input</p>
          <p className="text-zinc-400 text-sm">Select a language and paste your code below</p>
        </div>
        <LanguageSelector value={language} onChange={setLanguage} />
        <CodeEditor value={code} onChange={setCode} language={language} />
        <button
          onClick={handleSubmit}
          disabled={isLoading || !code.trim()}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl px-6 py-3 transition-all duration-300 ease-smooth shadow-glow-purple disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              Analyzing…
            </>
          ) : (
            'Analyze Code'
          )}
        </button>
        {error && (
          <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>
        )}
      </div>
      {isLoading && (
        <div className="glass-card rounded-2xl p-8 flex flex-col items-center gap-4 animate-fade-up">
          <div className="w-12 h-12 rounded-full border-2 border-violet-500/30 border-t-violet-400 animate-spin" />
          <p className="glow-text-purple text-sm font-medium animate-pulse-glow">AI is analyzing your code…</p>
          <div className="w-48 h-1 rounded-full shimmer-bg animate-shimmer" />
        </div>
      )}
      {result && <AnalysisResult result={result} />}
    </div>
  );
}