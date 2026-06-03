// src/app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'CodeStreak',
    template: '%s | CodeStreak',
  },
  description:
    'AI-powered code reviews, streak tracking, and personalized challenges to level up your developer skills.',
  keywords: [
    'code review',
    'AI',
    'developer',
    'challenges',
    'streak',
    'programming',
    'growth',
    'learning',
  ],
  authors: [{ name: 'CodeStreak' }],
  creator: 'CodeStreak',
  metadataBase: new URL('https://codestreak.dev'),
  openGraph: {
    title: 'CodeStreak',
    description:
      'AI-powered code reviews, streak tracking, and personalized challenges to level up your developer skills.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CodeStreak',
    description:
      'AI-powered code reviews, streak tracking, and personalized challenges to level up your developer skills.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`dark ${inter.variable} ${jetBrainsMono.variable}`}
      >
        <body className="font-sans antialiased">
          <div id="root-layout" className="relative min-h-screen overflow-x-hidden">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}