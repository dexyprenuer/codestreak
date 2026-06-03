// src/app/(auth)/layout.tsx
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
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

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        aria-hidden
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full flex items-center justify-center px-4 py-12">
        {children}
      </div>
    </div>
  );
}