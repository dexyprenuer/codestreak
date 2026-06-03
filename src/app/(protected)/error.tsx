'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0a0f',
      overflow: 'hidden',
    }}>
      {/* Ambient blobs */}
      <div style={{ position: 'absolute', width: '600px', height: '600px', background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.2, top: '-10%', left: '-10%', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', width: '500px', height: '500px', background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.2, bottom: '-10%', right: '-10%', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', width: '400px', height: '400px', background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.2, top: '40%', left: '50%', pointerEvents: 'none', zIndex: 0 }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '2rem' }}>
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>⚠️</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
          Something went wrong
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', maxWidth: '400px' }}>
          {error.message || 'An unexpected error occurred.'}
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={reset}
            style={{ padding: '0.75rem 1.5rem', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
          >
            Try again
          </button>
          <Link
            href="/dashboard"
            style={{ padding: '0.75rem 1.5rem', background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}