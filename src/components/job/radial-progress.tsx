'use client';

import { useState, useEffect } from 'react';

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
  
  // Start with the circle empty (full offset)
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    // On the client, after mounting, calculate the target offset and set it.
    // The CSS transition will handle the animation.
    const targetOffset = circumference - (score / 100) * circumference;
    // A small timeout helps ensure the transition is applied smoothly after initial render
    const timer = setTimeout(() => setOffset(targetOffset), 100);
    return () => clearTimeout(timer);
  }, [score, circumference]);

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
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={scoreColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
        />
      </svg>
      <span className="absolute text-sm font-semibold" style={{ color: scoreColor }}>
        {score}
      </span>
    </div>
  );
}
