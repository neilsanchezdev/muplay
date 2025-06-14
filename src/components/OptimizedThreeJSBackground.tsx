// src/components/OptimizedThreeJSBackground.tsx
'use client';

import { useThreeJS } from '@/hooks/useThreeJS';

interface OptimizedThreeJSBackgroundProps {
  className?: string;
  particleCount?: number;
  enableParticles?: boolean;
  enableGeometry?: boolean;
}

export default function OptimizedThreeJSBackground({
  className,
  particleCount = 1500, // Reduced for better performance
  enableParticles = true,
  enableGeometry = true,
}: OptimizedThreeJSBackgroundProps) {
  const { mountRef } = useThreeJS({
    enableParticles,
    enableGeometry,
    particleCount,
    onReady: () => {
      console.log('Three.js scene initialized');
    },
  });

  return <div ref={mountRef} className={`absolute inset-0 ${className}`} style={{ zIndex: 1 }} />;
}
