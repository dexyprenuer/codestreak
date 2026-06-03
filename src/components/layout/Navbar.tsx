// src/components/layout/Navbar.tsx
'use client';

import Link from 'next/link';
import { Flame, Menu } from 'lucide-react';
import { useSidebar } from '@/components/layout/SidebarContext';

export default function Navbar() {
  const { toggleSidebar } = useSidebar();

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 lg:hidden bg-black/40 backdrop-blur-[20px] border-b border-white/[0.07] h-14">
      <div className="flex items-center justify-between px-4 h-full">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Flame
            className="h-5 w-5"
            style={{
              color: '#a78bfa',
              filter: 'drop-shadow(0 0 6px rgba(124,58,237,0.8))',
            }}
          />
          <span className="glow-text-purple font-semibold">CodeStreak</span>
        </Link>

        <button
          onClick={toggleSidebar}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.08] transition-all duration-150 active:scale-95 active:bg-white/[0.1]"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5 text-white/70" />
        </button>
      </div>
    </nav>
  );
}