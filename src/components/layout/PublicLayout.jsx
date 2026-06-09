import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../ui/Logo';
import { Menu, X, LogOut, User, ShoppingBag, ClipboardList } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function PublicLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [customerSession, setCustomerSession] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('ub_cart') || '[]');
    setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
  };

  useEffect(() => {
    const session = localStorage.getItem('ub_customer_session');
    if (session) {
      setCustomerSession(JSON.parse(session));
    }
    
    updateCartCount();
    window.addEventListener('cart_updated', updateCartCount);
    
    return () => {
      window.removeEventListener('cart_updated', updateCartCount);
    };
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('ub_customer_session');
    setCustomerSession(null);
    window.location.href = '/';
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
              
              <Link to="/cart" className="relative group text-brand-dark/70 hover:text-brand-dark transition-colors">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {customerSession ? (
                <div className="flex items-center gap-6 border-l border-brand-tertiary/40 pl-6">
                  <Link 
                    to="/my-orders"
                    className="flex items-center gap-2 text-sm font-medium tracking-widest uppercase text-brand-dark/70 hover:text-brand-dark transition-colors"
                  >
                    <ClipboardList className="w-4 h-4" />
                    Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm font-medium tracking-widest uppercase text-brand-dark/70 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link 
                  to="/auth"
                  className="flex items-center gap-2 text-sm font-medium tracking-widest uppercase text-brand-dark/70 hover:text-brand-dark transition-colors border-l border-brand-tertiary/40 pl-6"
                >
                  <User className="w-4 h-4" />
                  Login
                </Link>
              )}
            </div>

            {/* Mobile menu button & Cart */}
            <div className="flex items-center gap-4 md:hidden">
              <Link to="/cart" className="relative text-brand-dark">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-brand-dark p-2 focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Fullscreen Overlay */}
        <div 
          className={`md:hidden fixed inset-0 z-40 bg-brand-bg transition-transform duration-500 ease-in-out ${
            isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
          style={{ paddingTop: '5rem' }} // Space for navbar
        >
          <div className="flex flex-col h-full px-6 pb-12 overflow-y-auto justify-center">
            <div className="space-y-6 flex flex-col items-center text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-3xl font-heading tracking-widest uppercase transition-colors ${
                    location.pathname === link.path ? 'text-brand-dark' : 'text-brand-dark/50 hover:text-brand-dark'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {customerSession ? (
                <>
                  <Link
                    to="/my-orders"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-3xl font-heading tracking-widest uppercase text-brand-dark/50 hover:text-brand-dark transition-colors"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block text-2xl mt-8 font-medium tracking-widest uppercase text-red-600/70 hover:text-red-600 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-3xl mt-8 font-heading tracking-widest uppercase text-brand-dark/50 hover:text-brand-dark transition-colors"
                >
                  Login / Register
                </Link>
              )}
            </div>
            
            <div className="mt-auto pt-12 flex flex-col items-center gap-4 border-t border-brand-tertiary/20">
              <span className="text-xs tracking-widest uppercase text-brand-dark/40 font-medium">Customer Service</span>
              <a href="mailto:support@ubthreads.com" className="text-sm tracking-wider text-brand-dark/70">support@ubthreads.com</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>

      {/* Global Footer for Public Pages */}
      <footer className="bg-brand-dark text-brand-light py-16 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-12 mb-8">
          
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <Logo className="w-8 h-8 text-brand-light" />
              <span className="font-heading font-semibold text-2xl tracking-wide">UB THREADS</span>
            </div>
            <p className="text-brand-light/60 font-light text-sm leading-relaxed max-w-xs">
              Elegance woven in tradition. Redefining authentic ethnic wear for the modern wardrobe.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold tracking-widest uppercase mb-6 text-sm">Shop</h4>
            <ul className="space-y-4 text-sm font-light text-brand-light/60">
              <li><Link to="/shop" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Best Sellers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold tracking-widest uppercase mb-6 text-sm">Support</h4>
            <ul className="space-y-4 text-sm font-light text-brand-light/60">
              <li><button className="hover:text-white transition-colors">Contact Us</button></li>
              <li><button className="hover:text-white transition-colors">Shipping & Returns</button></li>
              <li><button className="hover:text-white transition-colors">Size Guide</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold tracking-widest uppercase mb-6 text-sm">Legal</h4>
            <ul className="space-y-4 text-sm font-light text-brand-light/60">
              <li><button className="hover:text-white transition-colors">Privacy Policy</button></li>
              <li><button className="hover:text-white transition-colors">Terms of Service</button></li>
              <li><Link to="/admin/login" className="hover:text-brand-primary transition-colors">Admin Portal</Link></li>
            </ul>
          </div>

        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-brand-light/40 text-xs tracking-wider uppercase">
          &copy; {new Date().getFullYear()} UB Threads. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
