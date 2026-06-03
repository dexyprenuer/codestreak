'use client';

import { useEffect } from 'react';

export default function GlobalError({
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
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#0a0a0f', fontFamily: 'Inter, sans-serif', color: '#fff' }}>
        <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          {/* Ambient blobs */}
          <div style={{ position: 'absolute', width: '600px', height: '600px', background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.12, top: '-10%', left: '-10%', pointerEvents: 'none', zIndex: 0 }} />
          <div style={{ position: 'absolute', width: '500px', height: '500px', background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.12, bottom: '-10%', right: '-10%', pointerEvents: 'none', zIndex: 0 }} />
          <div style={{ position: 'absolute', width: '400px', height: '400px', background: 'radial-gradient(circle, #ef4444 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.12, top: '40%', left: '50%', pointerEvents: 'none', zIndex: 0 }} />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '2rem' }}>
            <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>💥</div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
              Critical Error
            </h1>
            <p style={{ color: '#94a3b8', marginBottom: '2rem', maxWidth: '400px' }}>
              {error.message || 'A critical error occurred. Please refresh.'}
            </p>
            <button
              onClick={reset}
              style={{ padding: '0.75rem 1.5rem', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}