'use client';

interface StatsCardProps {
  title: string;
  value: string | number;
  suffix?: string;
}

export default function StatsCard({ title, value, suffix = '' }: StatsCardProps) {
  const isScore = suffix === '/100';
  return (
    <div className="glass-card rounded-2xl p-6 relative group hover:-translate-y-1 transition-transform duration-300 ease-spring">
      <div className="flex flex-row items-center justify-between pb-2">
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      <div className={`text-4xl font-black ${isScore ? 'glow-text-cyan' : 'text-white'}`}>
        {value}{suffix}
      </div>
      {/* Shimmer line */}
      <div className="absolute bottom-0 left-0 right-0 h-px shimmer-bg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}