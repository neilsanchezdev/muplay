// src/components/QuickActions.tsx
'use client';

import { useState } from 'react';
import { PlaylistGenerator } from './PlaylistGenerator';

const quickActions = [
  { emoji: '🏃‍♂️', label: 'Energía para ejercicio', prompt: 'Música energética y motivadora para hacer ejercicio' },
  {
    emoji: '💼',
    label: 'Concentración trabajo',
    prompt: 'Música instrumental y relajada para concentrarse trabajando',
  },
  { emoji: '🚗', label: 'Viaje por carretera', prompt: 'Música perfecta para un viaje largo por carretera' },
  { emoji: '😌', label: 'Momento relajado', prompt: 'Música suave y relajante para descansar' },
  { emoji: '🎉', label: 'Ambiente de fiesta', prompt: 'Música divertida y bailable para una fiesta' },
  { emoji: '💕', label: 'Música romántica', prompt: 'Canciones románticas y emotivas' },
];

export default function QuickActions() {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [showGenerator, setShowGenerator] = useState(false);

  const handleActionClick = (action: (typeof quickActions)[0]) => {
    setSelectedAction(action.prompt);
    setShowGenerator(true);
  };

  return (
    <section className='py-20 px-6'>
      <div className='max-w-4xl mx-auto'>
        <h3 className='text-3xl font-bold text-center mb-12 gradient-text'>Opciones rápidas</h3>

        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleActionClick(action)}
              className='glass-card p-6 text-center hover:bg-white/10 transition-all duration-300 hover:transform hover:scale-105 group'
            >
              <span className='text-4xl mb-3 block group-hover:scale-110 transition-transform'>{action.emoji}</span>
              <span className='text-sm font-medium text-gray-300'>{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {showGenerator && (
        <PlaylistGenerator
          initialPrompt={selectedAction || ''}
          onClose={() => {
            setShowGenerator(false);
            setSelectedAction(null);
          }}
        />
      )}
    </section>
  );
}
