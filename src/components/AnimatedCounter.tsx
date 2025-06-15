// src/components/AnimatedCounter.tsx
'use client';

import { useCounterAnimation } from '@/hooks/useCounterAnimation';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  end,
  suffix = '',
  prefix = '',
  duration = 2000,
  className = '',
}: AnimatedCounterProps) {
  const { count, countRef, isVisible } = useCounterAnimation({
    end,
    duration,
  });

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  };

  return (
    <div ref={countRef} className={className}>
      <span className={`transition-all duration-300 ${isVisible ? 'scale-110' : 'scale-100'}`}>
        {prefix}
        {formatNumber(count)}
        {suffix}
      </span>
    </div>
  );
}
