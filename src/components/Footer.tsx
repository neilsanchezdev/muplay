// src/components/Footer.tsx
'use client';

import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para suscribirse al newsletter
    console.log('Email suscrito:', email);
    setEmail('');
    // Mostrar mensaje de éxito
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className='relative bg-gradient-to-t from-black via-gray-900/50 to-transparent border-t border-white/10'>
      <div className='max-w-6xl mx-auto px-6 py-16'>
        <div className='grid md:grid-cols-4 gap-8'>
          {/* Logo y descripción */}
          <div className='md:col-span-2'>
            <div className='mb-6'>
              <h3 className='text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent'>
                Muplay
              </h3>
              <p className='text-gray-400 mt-2 text-lg'>La música perfecta para cada momento</p>
            </div>
            <p className='text-gray-300 mb-6 max-w-md'>
              Generamos playlists personalizadas usando inteligencia artificial avanzada. Conecta con Spotify y descubre
              tu nueva canción favorita.
            </p>

            {/* Newsletter */}
            <div className='mb-6'>
              <h4 className='text-lg font-semibold mb-3 text-purple-300'>Mantente al día</h4>
              <form onSubmit={handleSubscribe} className='flex gap-2'>
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='tu@email.com'
                  className='flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors'
                  required
                />
                <button
                  type='submit'
                  className='bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:transform hover:-translate-y-1'
                >
                  Suscribir
                </button>
              </form>
            </div>

            {/* Social Media */}
            <div className='flex space-x-4'>
              <a
                href='#'
                className='bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-all duration-300 hover:scale-110 group'
                aria-label='Twitter'
              >
                <svg
                  className='w-5 h-5 transition-colors group-hover:text-purple-400'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' />
                </svg>
              </a>
              <a
                href='#'
                className='bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-all duration-300 hover:scale-110 group'
                aria-label='Instagram'
              >
                <svg
                  className='w-5 h-5 transition-colors group-hover:text-purple-400'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
                </svg>
              </a>
              <a
                href='#'
                className='bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-all duration-300 hover:scale-110 group'
                aria-label='GitHub'
              >
                <svg
                  className='w-5 h-5 transition-colors group-hover:text-purple-400'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                </svg>
              </a>
            </div>
          </div>

          {/* Producto */}
          <div>
            <h4 className='text-lg font-semibold mb-4 text-purple-300'>Producto</h4>
            <ul className='space-y-3'>
              <li>
                <a href='#' className='text-gray-300 hover:text-white transition-colors'>
                  Cómo funciona
                </a>
              </li>
              <li>
                <a href='#' className='text-gray-300 hover:text-white transition-colors'>
                  Precios
                </a>
              </li>
              <li>
                <a href='#' className='text-gray-300 hover:text-white transition-colors'>
                  API
                </a>
              </li>
              <li>
                <a href='#' className='text-gray-300 hover:text-white transition-colors'>
                  Integración Spotify
                </a>
              </li>
              <li>
                <a href='#' className='text-gray-300 hover:text-white transition-colors'>
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h4 className='text-lg font-semibold mb-4 text-purple-300'>Soporte</h4>
            <ul className='space-y-3'>
              <li>
                <a href='#' className='text-gray-300 hover:text-white transition-colors'>
                  Centro de ayuda
                </a>
              </li>
              <li>
                <a href='#' className='text-gray-300 hover:text-white transition-colors'>
                  Contacto
                </a>
              </li>
              <li>
                <a href='#' className='text-gray-300 hover:text-white transition-colors'>
                  Estado del servicio
                </a>
              </li>
              <li>
                <a href='#' className='text-gray-300 hover:text-white transition-colors'>
                  Términos de servicio
                </a>
              </li>
              <li>
                <a href='#' className='text-gray-300 hover:text-white transition-colors'>
                  Privacidad
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className='border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center'>
          <div className='text-gray-400 text-sm mb-4 md:mb-0'>
            © {currentYear} Muplay. Todos los derechos reservados.
          </div>

          <div className='flex items-center space-x-6 text-sm'>
            <a href='#' className='text-gray-400 hover:text-white transition-colors'>
              Términos
            </a>
            <a href='#' className='text-gray-400 hover:text-white transition-colors'>
              Privacidad
            </a>
            <a href='#' className='text-gray-400 hover:text-white transition-colors'>
              Cookies
            </a>
            <div className='flex items-center space-x-2 text-gray-400'>
              <span>Hecho con</span>
              <span className='text-purple-400 animate-pulse'>♥</span>
              <span>y</span>
              <span className='text-blue-400'>🤖</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent'></div>
    </footer>
  );
}
