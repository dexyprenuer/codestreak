// src/app/(protected)/layout.tsx
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { SidebarProvider, SidebarOverlay } from '@/components/layout/SidebarContext';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background relative overflow-x-hidden">
        {/* Mobile top navbar */}
        <div className="lg:hidden">
          <Navbar />
        </div>

        {/* Sidebar (desktop fixed + mobile drawer) */}
        <Sidebar />

        {/* Mobile overlay backdrop */}
        <SidebarOverlay />

        {/* Main content */}
        <main className="lg:ml-64 min-h-screen pt-14 lg:pt-0">
          <div className="relative z-10 p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}