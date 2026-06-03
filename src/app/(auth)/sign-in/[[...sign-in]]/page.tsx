
// src/app/(auth)/sign-in/[[...sign-in]]/page.tsx
import type { Metadata } from 'next';
import { SignIn } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your CodeStreak account.',
  robots: { index: false, follow: false },
};

const clerkAppearance = {
  variables: {
    colorPrimary: '#7c3aed',
    colorBackground: 'rgba(10, 8, 20, 0.95)',
    colorInputBackground: 'rgba(255,255,255,0.04)',
    colorInputText: '#ffffff',
    colorText: '#ffffff',
    colorTextSecondary: 'rgba(255,255,255,0.45)',
    colorNeutral: '#ffffff',
    borderRadius: '12px',
    fontFamily: 'var(--font-sans)',
  },
  elements: {
    card: 'bg-transparent shadow-none border-none',
    rootBox: 'w-full max-w-md',
    formButtonPrimary: 'bg-violet-600 hover:bg-violet-500 transition-colors duration-200 font-semibold',
    formFieldInput: 'border-white/10 focus:border-violet-400/50 transition-colors duration-200',
    footerActionLink: 'text-violet-400 hover:text-violet-300',
    identityPreviewEditButton: 'text-violet-400',
    dividerLine: 'bg-white/10',
    dividerText: 'text-white/30',
    socialButtonsBlockButton: 'border-white/10 hover:border-white/20 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-200',
    socialButtonsBlockButtonText: 'text-white/70',
  },
};

export default function SignInPage() {
  return (
    <div className="glass-card-strong p-8 w-full max-w-md shadow-glass">
      <SignIn appearance={clerkAppearance} />
    </div>
  );
}