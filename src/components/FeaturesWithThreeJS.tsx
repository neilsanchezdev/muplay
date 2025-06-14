// src/components/FeaturesWithThreeJS.tsx
'use client';

import { motion } from 'framer-motion';
import { Music, Zap, Heart } from 'lucide-react';

const features = [
  {
    icon: Music,
    title: 'Describe tu momento',
    description:
      'Solo dinos cómo te sientes o qué estás haciendo. "Música energética para ejercicio" o "algo relajado para estudiar"',
  },
  {
    icon: Zap,
    title: 'IA crea tu playlist',
    description:
      'Nuestro algoritmo inteligente selecciona las canciones perfectas considerando mood, transiciones y coherencia musical',
  },
  {
    icon: Heart,
    title: 'Guarda en Spotify',
    description: 'Conecta tu cuenta de Spotify y guarda tus playlists generadas directamente en tu biblioteca personal',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

export default function FeaturesWithThreeJS() {
  return (
    <section className='py-20 px-6 relative'>
      {/* Background gradient overlay */}
      <div className='absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none' />

      <div className='max-w-6xl mx-auto relative z-10'>
        <motion.h2
          className='text-4xl md:text-6xl font-bold text-center mb-16 gradient-text'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Cómo funciona
        </motion.h2>

        <motion.div
          className='grid md:grid-cols-3 gap-8'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className='glass-card p-8 text-center hover:bg-white/10 transition-all duration-300 group'
              variants={itemVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
            >
              <motion.div
                className='w-16 h-16 mx-auto mb-6 text-purple-400'
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <feature.icon className='w-full h-full' />
              </motion.div>
              <h3 className='text-2xl font-semibold mb-4 text-purple-300'>{feature.title}</h3>
              <p className='text-gray-300 leading-relaxed'>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
