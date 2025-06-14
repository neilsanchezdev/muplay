// next.config.js (optimizaciones para Three.js)
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['three', 'framer-motion', 'lucide-react'],
  },
  webpack: (config) => {
    // Optimize Three.js bundle
    config.resolve.alias = {
      ...config.resolve.alias,
      'three/examples/jsm': 'three/examples/jsm',
    };

    return config;
  },
  images: {
    domains: ['i.scdn.co'], // Para las imágenes de Spotify cuando las integres
  },
};

module.exports = nextConfig;
