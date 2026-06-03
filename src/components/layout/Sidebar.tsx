// src/components/layout/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Code2, Trophy, History, Flame, X } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import { useSidebar } from '@/components/layout/SidebarContext';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/analyze', label: 'Analyze Code', icon: Code2 },
  { href: '/challenges', label: 'Challenges', icon: Trophy },
  { href: '/history', label: 'History', icon: History },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen, closeSidebar } = useSidebar();

  const sidebarContent = (
    <>
      {/* Logo section */}
      <div className="p-6 border-b border-white/[0.06]">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 transition-transform duration-200 ease-spring hover:scale-[1.02]"
        >
          <Flame
            className="h-7 w-7"
            style={{
              color: '#a78bfa',
              filter: 'drop-shadow(0 0 8px rgba(124,58,237,0.8))',
            }}
          />
          <span className="glow-text-purple text-xl font-bold">CodeStreak</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeSidebar}
              className={cn(
                'flex items-center gap-3 rounded-xl text-sm font-medium transition-all duration-200 ease-smooth relative overflow-hidden',
                isActive
                  ? 'text-white bg-white/[0.08] border border-white/[0.12]'
                  : 'text-white/40 hover:text-white/80 hover:bg-white/[0.04] hover:translate-x-[2px]',
                'px-4 py-3' // minimum touch target
              )}
            >
              {isActive && (
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[60%] rounded-full bg-violet-400"
                  style={{ boxShadow: '0 0 8px rgba(167,139,250,0.9)' }}
                />
              )}
              <Icon
                className="h-4 w-4 shrink-0"
                style={isActive ? { color: '#a78bfa' } : { color: 'inherit' }}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-3">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox:
                  'w-9 h-9 ring-2 ring-white/10 ring-offset-0',
              },
            }}
          />
          <span className="text-xs text-white/30 mt-1">Account</span>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-64 z-50 bg-black/40 backdrop-blur-[28px] border-r border-white/[0.08] shadow-[inset_-1px_0_0_rgba(255,255,255,0.04)]">
        {sidebarContent}
      </aside>

      {/* Mobile drawer */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-screen w-72 z-50 flex flex-col lg:hidden bg-black/40 backdrop-blur-[28px] transition-transform duration-300 ease-smooth',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <button
          onClick={closeSidebar}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Close menu"
        >
          <X className="h-4 w-4 text-white/70" />
        </button>
        {sidebarContent}
      </aside>
    </>
  );
}