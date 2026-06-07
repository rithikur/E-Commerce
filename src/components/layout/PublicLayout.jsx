import { Link, useLocation } from 'react-router-dom';
import Logo from '../ui/Logo';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function PublicLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg font-body">
      {/* Navbar */}
      <nav className="bg-brand-bg border-b border-brand-tertiary/40 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-3 group">
                <Logo className="w-8 h-8 transition-transform group-hover:scale-105" />
                <span className="font-heading font-semibold text-2xl tracking-wide text-brand-dark">UB THREADS</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm uppercase tracking-widest font-medium transition-colors hover:text-brand-primary ${
                    location.pathname === link.path 
                      ? 'text-brand-dark border-b border-brand-dark pb-1' 
                      : 'text-brand-dark/70 border-b border-transparent pb-1'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/admin/login"
                className="text-sm font-medium tracking-widest uppercase text-brand-dark border border-brand-dark px-4 py-2 hover:bg-brand-dark hover:text-brand-light transition-colors"
              >
                Admin
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-brand-dark p-2 focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-brand-tertiary/40 animate-in slide-in-from-top-2">
            <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-4 text-base font-medium tracking-wide uppercase border-b border-brand-tertiary/20 ${
                    location.pathname === link.path ? 'text-brand-dark' : 'text-brand-dark/70'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/admin/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-4 text-base font-medium tracking-wide uppercase text-brand-dark"
              >
                Admin Login
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>

      {/* Global Footer for Public Pages */}
      <footer className="bg-white border-t border-brand-tertiary/40 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-sm text-brand-dark/60 tracking-wider uppercase">
          <p>&copy; {new Date().getFullYear()} UB Threads.</p>
          <p className="mt-4 md:mt-0">Premium Apparel</p>
        </div>
      </footer>
    </div>
  );
}
