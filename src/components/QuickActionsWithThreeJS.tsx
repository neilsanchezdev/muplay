// src/components/QuickActionsWithThreeJS.tsx (versión moderna)
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlaylistGenerator } from './PlaylistGenerator';

// Iconos modernos usando SVG
const WorkoutIcon = () => (
  <svg className='w-full h-full' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
    <path d='m6.5 6.5 11 11' />
    <path d='m21 21-1-1' />
    <path d='m3 3 1 1' />
    <path d='m18 22 4-4' />
    <path d='m2 6 4-4' />
    <path d='m3 10 7-7' />
    <path d='m14 21 7-7' />
  </svg>
);

const WorkIcon = () => (
  <svg className='w-full h-full' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
    <rect width='18' height='18' x='3' y='4' rx='2' ry='2' />
    <line x1='16' x2='16' y1='2' y2='6' />
    <line x1='8' x2='8' y1='2' y2='6' />
    <line x1='3' x2='21' y1='10' y2='10' />
    <path d='M8 14h.01' />
    <path d='M12 14h.01' />
    <path d='M16 14h.01' />
    <path d='M8 18h.01' />
    <path d='M12 18h.01' />
    <path d='M16 18h.01' />
  </svg>
);

const TravelIcon = () => (
  <svg className='w-full h-full' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
    <path d='M8 22V12.5L2 7l3-3 9 4.5V2l3 2 2 8-2 8-3 2v-6.5L9 20l-1 2Z' />
  </svg>
);

const RelaxIcon = () => (
  <svg className='w-full h-full' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
    <path d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z' />
  </svg>
);

const PartyIcon = () => (
  <svg className='w-full h-full' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
    <polygon points='13,2 3,14 12,14 11,22 21,10 12,10' />
  </svg>
);

const RomanticIcon = () => (
  <svg className='w-full h-full' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
    <path d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z' />
  </svg>
);

const StudyIcon = () => (
  <svg className='w-full h-full' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
    <path d='M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z' />
    <circle cx='12' cy='13' r='3' />
  </svg>
);

const CoffeeIcon = () => (
  <svg className='w-full h-full' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
    <path d='M10 2v20M14 2v20M4 7h16M6 12h12' />
  </svg>
);

const quickActions = [
  {
    icon: WorkoutIcon,
    label: 'Energía para ejercicio',
    description: 'Música motivadora y enérgica',
    prompt: 'Música energética y motivadora para hacer ejercicio',
    gradient: 'from-red-500 to-orange-500',
    hoverGradient: 'from-red-600 to-orange-600',
  },
  {
    icon: WorkIcon,
    label: 'Concentración trabajo',
    description: 'Instrumental y productiva',
    prompt: 'Música instrumental y relajada para concentrarse trabajando',
    gradient: 'from-blue-500 to-cyan-500',
    hoverGradient: 'from-blue-600 to-cyan-600',
  },
  {
    icon: TravelIcon,
    label: 'Viaje por carretera',
    description: 'Perfecta para aventuras',
    prompt: 'Música perfecta para un viaje largo por carretera',
    gradient: 'from-green-500 to-emerald-500',
    hoverGradient: 'from-green-600 to-emerald-600',
  },
  {
    icon: RelaxIcon,
    label: 'Momento relajado',
    description: 'Suave y tranquila',
    prompt: 'Música suave y relajante para descansar',
    gradient: 'from-indigo-500 to-purple-500',
    hoverGradient: 'from-indigo-600 to-purple-600',
  },
  {
    icon: PartyIcon,
    label: 'Ambiente de fiesta',
    description: 'Divertida y bailable',
    prompt: 'Música divertida y bailable para una fiesta',
    gradient: 'from-pink-500 to-rose-500',
    hoverGradient: 'from-pink-600 to-rose-600',
  },
  {
    icon: RomanticIcon,
    label: 'Música romántica',
    description: 'Emotiva y sentimental',
    prompt: 'Canciones románticas y emotivas',
    gradient: 'from-purple-500 to-pink-500',
    hoverGradient: 'from-purple-600 to-pink-600',
  },
  {
    icon: StudyIcon,
    label: 'Sesión de estudio',
    description: 'Perfecta para estudiar',
    prompt: 'Música instrumental perfecta para estudiar y concentrarse',
    gradient: 'from-teal-500 to-blue-500',
    hoverGradient: 'from-teal-600 to-blue-600',
  },
  {
    icon: CoffeeIcon,
    label: 'Café matutino',
    description: 'Suave para despertar',
    prompt: 'Música suave y alegre para tomar café por la mañana',
    gradient: 'from-amber-500 to-yellow-500',
    hoverGradient: 'from-amber-600 to-yellow-600',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function QuickActionsWithThreeJS() {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [showGenerator, setShowGenerator] = useState(false);

  const handleActionClick = (action: (typeof quickActions)[0]) => {
    setSelectedAction(action.prompt);
    setShowGenerator(true);
  };

  return (
    <section className='py-20 px-6 relative'>
      <div className='max-w-6xl mx-auto relative z-10'>
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className='text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent'>
            Opciones rápidas
          </h3>
          <p className='text-gray-400 text-lg max-w-2xl mx-auto'>
            Elige el mood perfecto para tu momento y deja que la IA cree la banda sonora ideal
          </p>
        </motion.div>

        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          {quickActions.map((action, index) => (
            <motion.button
              key={index}
              onClick={() => handleActionClick(action)}
              className='group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-left hover:bg-white/10 transition-all duration-500 overflow-hidden'
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                y: -5,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Gradient overlay on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              {/* Icon container */}
              <div
                className={`relative w-16 h-16 mb-4 p-3 rounded-xl bg-gradient-to-br ${action.gradient} text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
              >
                <action.icon />
              </div>

              {/* Content */}
              <div className='relative'>
                <h4 className='text-lg font-semibold mb-2 text-white group-hover:text-gray-100 transition-colors'>
                  {action.label}
                </h4>
                <p className='text-sm text-gray-400 group-hover:text-gray-300 transition-colors'>
                  {action.description}
                </p>
              </div>

              {/* Animated border */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                style={{
                  background: `linear-gradient(45deg, transparent, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%, transparent)`,
                  backgroundSize: '200% 200%',
                  animation: 'shimmer 3s ease-in-out infinite',
                }}
              />

              {/* Arrow indicator */}
              <div className='absolute top-4 right-4 w-6 h-6 text-gray-400 group-hover:text-white transform group-hover:translate-x-1 transition-all duration-300'>
                <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                  <path d='M7 17L17 7M17 7H7M17 7V17' />
                </svg>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Stats section */}
        <motion.div
          className='mt-16 grid grid-cols-2 md:grid-cols-4 gap-6'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {[
            { number: '50K+', label: 'Playlists creadas' },
            { number: '1M+', label: 'Canciones analizadas' },
            { number: '95%', label: 'Satisfacción' },
            { number: '24/7', label: 'Disponible' },
          ].map((stat, index) => (
            <div key={index} className='text-center bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4'>
              <div className='text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-1'>
                {stat.number}
              </div>
              <div className='text-sm text-gray-400'>{stat.label}</div>
            </div>
          ))}
        </motion.div>
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

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </section>
  );
}
