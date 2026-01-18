import { cn } from '@/lib/utils';
import { type SVGProps } from 'react';

export default function AppLogo({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 50"
      className={cn('h-8 w-auto', className)}
      {...props}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))' }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))' }} />
        </linearGradient>
      </defs>
      <text
        x="0"
        y="40"
        fontFamily="var(--font-inter), sans-serif"
        fontSize="40"
        fontWeight="bold"
        fill="url(#logo-gradient)"
      >
        Resume
        <tspan fill="hsl(var(--foreground))">Flow</tspan>
      </text>
    </svg>
  );
}
