'use client';
import dynamic from 'next/dynamic';

// Lazy load components for better performance
const HeroSectionOptimized = dynamic(() => import('@/components/HeroSectionOptimized'), { ssr: false });

const FeaturesWithThreeJS = dynamic(() => import('@/components/FeaturesWithThreeJS'), { ssr: false });

const QuickActionsWithThreeJS = dynamic(() => import('@/components/QuickActionsWithThreeJS'), { ssr: false });

const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

export default function Home() {
  return (
    <main className='min-h-screen bg-black text-white overflow-x-hidden'>
      <HeroSectionOptimized />
      <FeaturesWithThreeJS />
      <QuickActionsWithThreeJS />
      <Footer />
    </main>
  );
}
