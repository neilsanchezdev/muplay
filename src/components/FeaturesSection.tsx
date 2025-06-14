// src/components/FeaturesSection.tsx
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

export default function FeaturesSection() {
  return (
    <section className='py-20 px-6 relative'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-4xl md:text-6xl font-bold text-center mb-16 gradient-text'>Cómo funciona</h2>

        <div className='grid md:grid-cols-3 gap-8'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='glass-card p-8 text-center hover:bg-white/10 transition-all duration-300 hover:transform hover:-translate-y-2'
            >
              <feature.icon className='w-16 h-16 mx-auto mb-6 text-purple-400' />
              <h3 className='text-2xl font-semibold mb-4 text-purple-300'>{feature.title}</h3>
              <p className='text-gray-300 leading-relaxed'>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
