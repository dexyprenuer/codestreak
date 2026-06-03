import type { Metadata } from 'next';
import Link from 'next/link';
import { Flame, ArrowRight, Sparkles, Zap, Trophy } from 'lucide-react';

export const metadata: Metadata = {
  title: 'CodeStreak — Developer Growth OS',
  description: 'AI code reviews, personalized challenges, and daily streak tracking to close the gap between writing code and writing great code.',
  keywords: ['code review', 'AI coding', 'developer growth', 'coding challenges', 'streak tracker', 'programming skills'],
  alternates: { canonical: 'https://codestreak.dev' },
  openGraph: {
    title: 'CodeStreak — Developer Growth OS',
    description: 'AI-powered developer growth platform.',
    url: 'https://codestreak.dev',
    siteName: 'CodeStreak',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CodeStreak — Developer Growth OS',
    description: 'AI-powered developer growth platform.',
  },
};

export default function LandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'CodeStreak',
            applicationCategory: 'DeveloperApplication',
            description: 'AI-powered code review and developer growth platform',
            url: 'https://codestreak.dev',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          }),
        }}
      />

      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-[20px] border-b border-white/[0.06] h-16">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-full">
          <Link href="/" className="flex items-center gap-2">
            <Flame className="h-6 w-6" style={{ color: '#a78bfa', filter: 'drop-shadow(0 0 8px rgba(124,58,237,0.7))' }} />
            <span className="glow-text-purple text-lg font-bold">CodeStreak</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/sign-in" className="text-sm text-white/60 hover:text-white transition-colors duration-200 px-4 py-2">
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="text-sm font-semibold px-5 py-2 rounded-full bg-violet-600/80 hover:bg-violet-500/90 border border-violet-400/30 text-white transition-all duration-200 hover:shadow-glow-purple hover:scale-[1.03] active:scale-[0.97]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        {/* Ambient blobs */}
        <div
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-20 animate-blob pointer-events-none"
          aria-hidden
          style={{ background: 'radial-gradient(circle, #7c3aed, transparent 70%)' }}
        />
        <div
          className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-15 animate-blob-slow pointer-events-none"
          aria-hidden
          style={{ background: 'radial-gradient(circle, #2563eb, transparent 70%)', animationDelay: '4s' }}
        />
        <div
          className="absolute top-[40%] left-[60%] w-[350px] h-[350px] rounded-full opacity-10 animate-blob pointer-events-none"
          aria-hidden
          style={{ background: 'radial-gradient(circle, #06b6d4, transparent 70%)', animationDelay: '8s' }}
        />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-400/20 text-violet-300 text-xs font-medium mb-8 animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            AI-Powered Developer Growth
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <span className="text-white">Developer Growth</span>
            <br />
            <span className="glow-text-purple">Operating System</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-white/50 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
            AI code reviews. Personalized challenges. Daily streaks. Close the gap between writing code and writing <i>great</i> code.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-base hover:from-violet-500 hover:to-indigo-500 transition-all duration-300 shadow-glow-purple hover:shadow-[0_0_60px_rgba(124,58,237,0.5)] hover:scale-[1.04] active:scale-[0.98]"
            >
              Start Your Streak
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/sign-in"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/[0.05] border border-white/[0.1] text-white/80 font-medium text-base hover:bg-white/[0.08] hover:text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Sign In
            </Link>
          </div>

          {/* 3D Floating Mock Card */}
          <div className="mt-16 relative mx-auto max-w-2xl animate-float group" style={{ perspective: '1000px' }}>
            <div className="glass-card-strong p-6 rounded-2xl shadow-glass [transform:rotateX(8deg)_rotateY(-4deg)] group-hover:[transform:rotateX(4deg)_rotateY(-2deg)] transition-transform duration-500 ease-smooth">
              {/* Header */}
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-white/40 font-mono">AI Analysis Complete</span>
              </div>

              {/* Score */}
              <div className="mt-4 flex items-end gap-2">
                <span className="text-5xl font-black glow-text-purple">87</span>
                <span className="text-sm text-white/30 mb-2">/100</span>
              </div>
              <p className="text-xs text-white/40 mt-1">Overall Score</p>

              <div className="border-t border-white/[0.06] my-4" />

              {/* Strengths */}
              <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-2">Strengths</p>
              <div className="inline-flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 border border-emerald-400/20 text-emerald-300">
                  Clean decomposition
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 border border-emerald-400/20 text-emerald-300">
                  Good naming
                </span>
              </div>

              {/* Suggestions */}
              <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-2 mt-4">Suggestions</p>
              <div className="inline-flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 border border-violet-400/20 text-violet-300">
                  Add input validation
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 border border-violet-400/20 text-violet-300">
                  Optimize loops
                </span>
              </div>

              {/* Shimmer bar */}
              <div className="mt-4 h-1 rounded-full shimmer-bg" />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-violet-400 mb-4">
            Everything You Need
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Built for developers who ship
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Tools and insights that accelerate your growth from journeyman to craftsman.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="glass-card p-8 group hover:shadow-glass transition-all duration-300 hover:border-white/[0.15] hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 bg-violet-500/15 border border-violet-400/20">
              <Sparkles className="h-6 w-6" style={{ color: '#a78bfa' }} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">AI Code Review</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              Get instant, structured feedback on your code with scores and actionable suggestions.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-card p-8 group hover:shadow-glass transition-all duration-300 hover:border-white/[0.15] hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 bg-blue-500/15 border border-blue-400/20">
              <Zap className="h-6 w-6" style={{ color: '#60a5fa' }} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Personalized Challenges</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              Next challenges tailored to your weaknesses. Never wonder what to learn next.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-card p-8 group hover:shadow-glass transition-all duration-300 hover:border-white/[0.15] hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 bg-cyan-500/15 border border-cyan-400/20">
              <Trophy className="h-6 w-6" style={{ color: '#67e8f9' }} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Streak Tracking</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              Build momentum with daily coding. Your longest streak is your resume.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Flame className="h-5 w-5" style={{ color: '#a78bfa', filter: 'drop-shadow(0 0 6px rgba(124,58,237,0.6))' }} />
            <span className="glow-text-purple text-lg font-bold">CodeStreak</span>
          </Link>
          <div className="flex items-center gap-6 text-sm text-white/40">
            <Link href="/sign-in" className="hover:text-white/70 transition-colors">
              Sign In
            </Link>
            <Link href="/sign-up" className="hover:text-white/70 transition-colors">
              Get Started
            </Link>
          </div>
          <p className="text-sm text-white/30">
            © {new Date().getFullYear()} CodeStreak. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}