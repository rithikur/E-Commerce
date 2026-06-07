import { useState, useEffect } from 'react';
import Logo from '../components/ui/Logo';

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Subtle, elegant initial load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Logo className="w-12 h-12 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-1000">
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading text-brand-dark mb-6 tracking-tight">
        Under Construction
      </h2>
      
      <p className="text-lg md:text-xl text-brand-dark/80 font-light tracking-wide max-w-2xl">
        We are currently building our new online experience. Visit our shop preview or check back later for the full launch.
      </p>
    </div>
  );
}
