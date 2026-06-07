import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../ui/Logo';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function PublicLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [customerSession, setCustomerSession] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const session = localStorage.getItem('ub_customer_session');
    if (session) {
      setCustomerSession(JSON.parse(session));
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('ub_customer_session');
    setCustomerSession(null);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg font-body">
      {/* Navbar */}
      <nav className="bg-brand-bg border-b border-brand-tertiary/40 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-3 group">
                <Logo className="w-6 h-6 transition-transform group-hover:scale-105" />
                <span className="font-heading font-semibold text-xl tracking-wide text-brand-dark">UB THREADS</span>
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
              
              {customerSession ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm font-medium tracking-widest uppercase text-brand-dark/70 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              ) : (
                <Link 
                  to="/auth"
                  className="flex items-center gap-2 text-sm font-medium tracking-widest uppercase text-brand-dark/70 hover:text-brand-dark transition-colors"
                >
                  <User className="w-4 h-4" />
                  Login
                </Link>
              )}
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
              {customerSession ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-4 text-base font-medium tracking-wide uppercase text-red-600 border-b border-brand-tertiary/20"
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-4 text-base font-medium tracking-wide uppercase text-brand-dark border-b border-brand-tertiary/20"
                >
                  Login
                </Link>
              )}
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
          <p className="mt-4 md:mt-0 flex gap-4">
            <Link to="/admin/login" className="hover:text-brand-dark transition-colors">Admin Portal</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
