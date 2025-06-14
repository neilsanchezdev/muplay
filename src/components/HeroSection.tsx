// src/components/HeroSection.tsx
'use client';

import { useState } from 'react';
import { Button } from './ui/Button';
import { PlaylistGenerator } from './PlaylistGenerator';

export default function HeroSection() {
  const [showGenerator, setShowGenerator] = useState(false);

  return (
    <section className='min-h-screen flex items-center justify-center relative overflow-hidden'>
      {/* Background gradient */}
      <div className='absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20' />

      {/* Animated background elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl animate-pulse' />
        <div className='absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000' />
      </div>

      <div className='relative z-10 text-center max-w-4xl mx-auto px-6'>
        <h1 className='text-6xl md:text-8xl font-bold mb-6 gradient-text animate-fade-in'>Muplay</h1>

        <p className='text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in-delay-1'>
          Crea la playlist perfecta con inteligencia artificial
        </p>

        <p className='text-gray-400 mb-12 max-w-2xl mx-auto animate-fade-in-delay-2'>
          Describe tu mood, actividad o momento perfecto y nosotros generamos la banda sonora ideal
        </p>

        <div className='flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-3'>
          <Button onClick={() => setShowGenerator(true)} className='btn-primary text-lg px-8 py-4'>
            Crear Playlist
          </Button>
          <Button variant='secondary' className='btn-secondary text-lg px-8 py-4'>
            Ver Demo
          </Button>
        </div>
      </div>

      {showGenerator && <PlaylistGenerator onClose={() => setShowGenerator(false)} />}
    </section>
  );
}
