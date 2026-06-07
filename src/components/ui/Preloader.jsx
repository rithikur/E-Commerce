import { useState, useEffect } from 'react';
import Logo from './Logo';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Start fade out after 1.2 seconds
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1200);

    // Completely remove after 1.5 seconds
    const removeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-bg transition-opacity duration-500 ease-in-out ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-6 animate-in slide-in-from-bottom-4 duration-1000">
        {/* Animated Logo */}
        <div className="relative">
          <Logo className="w-16 h-16 text-brand-dark relative z-10" />
          <div className="absolute inset-0 border border-brand-primary rounded-full animate-ping opacity-20" style={{ animationDuration: '2s' }}></div>
        </div>
        
        {/* Brand Text */}
        <div className="text-center overflow-hidden">
          <h1 className="text-3xl font-heading font-semibold text-brand-dark tracking-[0.3em] uppercase mb-2">
            UB THREADS
          </h1>
          <p className="text-sm text-brand-dark/60 tracking-widest uppercase font-medium animate-pulse">
            Loading Experience
          </p>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-48 h-[1px] bg-brand-tertiary/30 mt-8 overflow-hidden">
          <div className="h-full bg-brand-dark animate-[slideRight_2.5s_ease-in-out]"></div>
        </div>
      </div>
      
      {/* Add keyframes directly for the custom slide animation */}
      <style>{`
        @keyframes slideRight {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
