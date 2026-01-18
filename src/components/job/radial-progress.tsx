'use client';

import { motion } from 'framer-motion';

interface RadialProgressProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

export default function RadialProgress({
  score,
  size = 60,
  strokeWidth = 5,
}: RadialProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const scoreColor =
    score >= 90
      ? 'hsl(var(--accent))'
      : score >= 75
      ? 'hsl(var(--primary))'
      : 'hsl(var(--muted-foreground))';

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="hsl(var(--border))"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={scoreColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>
      <span className="absolute text-sm font-semibold" style={{ color: scoreColor }}>
        {score}
      </span>
    </div>
  );
}
