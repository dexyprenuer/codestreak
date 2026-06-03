'use client';

interface ScoreTrendProps {
  scores: number[];
}

export default function ScoreTrend({ scores }: ScoreTrendProps) {
  const width = 300;
  const height = 90;
  const paddingX = 10;
  const maxY = 85;
  const minY = 10;

  const getX = (index: number, total: number) => {
    if (total <= 1) return width / 2;
    return paddingX + (index * (width - 2 * paddingX)) / (total - 1);
  };
  const getY = (score: number) => maxY - (score / 100) * (maxY - minY);

  const points = scores.map((score, idx) => ({
    x: getX(idx, scores.length),
    y: getY(score),
  }));

  const linePath =
    points.length > 0
      ? points.reduce((d, point, i) => {
          const cmd = i === 0 ? 'M' : 'L';
          return `${d} ${cmd}${point.x},${point.y}`;
        }, '')
      : '';

  const areaPath =
    points.length > 0
      ? `${linePath} L${points[points.length - 1].x},${maxY} L${points[0].x},${maxY} Z`
      : '';

  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-sm font-medium mb-4">Score Trend</h3>
      {scores.length === 0 ? (
        <p className="text-center text-zinc-500 py-8">No score data yet</p>
      ) : (
        <>
          <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="auto" preserveAspectRatio="none">
            <defs>
              <linearGradient id="violetGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
              </linearGradient>
            </defs>
            {areaPath && <path d={areaPath} fill="url(#violetGradient)" />}
            {linePath && (
              <path
                d={linePath}
                fill="none"
                stroke="#a78bfa"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            {points.map((point, i) => (
              <circle key={i} cx={point.x} cy={point.y} r="2.5" fill="#a78bfa" />
            ))}
          </svg>
          <div className="flex justify-between mt-2 px-1">
            {scores.map((score, idx) => (
              <span key={idx} className="text-xs text-zinc-500">{score}</span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}