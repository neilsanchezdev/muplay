// src/components/HeroSectionOptimized.tsx
'use client';

import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Button } from './ui/Button';
import { PlaylistGenerator } from './PlaylistGenerator';

// Lazy load Three.js component for better performance
const OptimizedThreeJSBackground = dynamic(() => import('./OptimizedThreeJSBackground'), {
  ssr: false,
  loading: () => <div className='absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20' />,
});

export default function HeroSectionOptimized() {
  const [showGenerator, setShowGenerator] = useState(false);

  return (
    <section className='min-h-screen flex items-center justify-center relative overflow-hidden'>
      {/* Three.js Background */}
      <Suspense
        fallback={<div className='absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20' />}
      >
        <OptimizedThreeJSBackground />
      </Suspense>

      {/* Content */}
      <div className='relative z-10 text-center max-w-4xl mx-auto px-6'>
        <motion.h1
          className='text-6xl md:text-8xl font-bold mb-6 gradient-text'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          Muplay
        </motion.h1>

        <motion.p
          className='text-xl md:text-2xl text-gray-300 mb-8'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
        >
          Crea la playlist perfecta con inteligencia artificial
        </motion.p>

        <motion.p
          className='text-gray-400 mb-12 max-w-2xl mx-auto'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
        >
          Describe tu mood, actividad o momento perfecto y nosotros generamos la banda sonora ideal
        </motion.p>

        <motion.div
          className='flex flex-col sm:flex-row gap-4 justify-center'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.6 }}
        >
          <Button onClick={() => setShowGenerator(true)} className='btn-primary text-lg px-8 py-4'>
            Crear Playlist
          </Button>
          <Button variant='secondary' className='btn-secondary text-lg px-8 py-4'>
            Ver Demo
          </Button>
        </motion.div>
      </div>

      {showGenerator && <PlaylistGenerator onClose={() => setShowGenerator(false)} />}
    </section>
  );
}
