import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/ui/Logo';

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Subtle, elegant initial load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <Logo className="w-12 h-12 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col justify-between p-8 md:p-16 animate-in fade-in duration-1000">
      <header className="flex justify-between items-center w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Logo className="w-8 h-8 md:w-10 md:h-10" />
          <h1 className="text-2xl md:text-3xl font-heading font-semibold tracking-wide text-brand-dark">
            UB THREADS
          </h1>
        </div>
        <button 
          onClick={() => navigate('/admin/login')}
          className="text-sm font-medium tracking-widest uppercase text-brand-dark hover:text-brand-primary transition-colors border-b border-transparent hover:border-brand-primary pb-1"
        >
          Admin
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center max-w-3xl mx-auto w-full">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading text-brand-dark mb-6 tracking-tight">
          Under Construction
        </h2>
        
        <p className="text-lg md:text-xl text-brand-dark/80 font-light tracking-wide">
          Our new online store is launching soon.
        </p>
      </main>

      <footer className="w-full max-w-7xl mx-auto text-center md:text-left flex flex-col md:flex-row justify-between items-center text-sm text-brand-dark/60 tracking-wider uppercase">
        <p>&copy; {new Date().getFullYear()} UB Threads.</p>
        <p className="mt-2 md:mt-0">Coming Soon</p>
      </footer>
    </div>
  );
}
