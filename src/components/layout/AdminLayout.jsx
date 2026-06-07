import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LogOut, LayoutGrid, Package, Users } from 'lucide-react';
import Logo from '../ui/Logo';

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('ub_admin_session');
    navigate('/admin/login');
  };

  const navLinks = [
    { name: 'Categories', path: '/admin/categories', icon: LayoutGrid },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Customers', path: '/admin/customers', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-brand-bg flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-brand-tertiary/60 flex flex-col hidden md:flex fixed inset-y-0 z-10">
        <div className="p-6 border-b border-brand-tertiary/60 flex items-center gap-3">
          <Logo className="w-8 h-8" />
          <span className="font-heading font-bold text-xl tracking-wide text-brand-dark">UB THREADS</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 font-medium transition-colors uppercase text-sm tracking-wider border ${
                  isActive 
                    ? 'bg-brand-bg text-brand-dark border-brand-tertiary/60' 
                    : 'text-brand-dark/70 border-transparent hover:bg-brand-bg/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-brand-dark' : 'text-brand-dark/70'}`} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-brand-tertiary/60">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors font-medium uppercase text-sm tracking-wider border border-transparent hover:border-red-100"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen relative">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-brand-tertiary/60 p-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <Logo className="w-6 h-6" />
            <span className="font-heading font-bold text-lg tracking-wide text-brand-dark">UB THREADS</span>
          </div>
          <button onClick={handleLogout} className="p-2 text-red-600 hover:bg-red-50">
            <LogOut className="w-5 h-5" />
          </button>
        </header>

        <div className="flex-1 p-4 md:p-8 overflow-y-auto w-full max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
