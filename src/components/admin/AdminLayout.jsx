import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Tag, Package, Users, ShoppingBag, LogOut } from 'lucide-react'
import { adminLogout } from '../../utils/store'

const navItems = [
  { label: 'Dashboard',  icon: LayoutDashboard, path: '/admin' },
  { label: 'Categories', icon: Tag,             path: '/admin/categories' },
  { label: 'Products',   icon: Package,         path: '/admin/products' },
  { label: 'Customers',  icon: Users,           path: '/admin/customers' },
  { label: 'Orders',     icon: ShoppingBag,     path: '/admin/orders' },
]

export default function AdminLayout({ children }) {
  const location = useLocation()
  const navigate = useNavigate()

  function handleLogout() {
    adminLogout()
    navigate('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-ub-lightest">
      {/* Sidebar */}
      <aside className="w-56 bg-ub-darkest flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="px-6 py-7 border-b border-white/10">
          <h1 className="font-cormorant italic text-white text-2xl">UB Threads</h1>
          <p className="font-jost text-ub-muted text-[10px] tracking-[0.3em] uppercase mt-0.5">Admin Panel</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map(({ label, icon: Icon, path }) => {
            const active = location.pathname === path
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 px-3 py-2.5 text-xs font-jost tracking-[0.1em] uppercase transition-colors duration-150 ${
                  active
                    ? 'bg-ub-mid/20 text-ub-mid border-l-2 border-ub-mid'
                    : 'text-ub-muted hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={15} />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 text-xs font-jost tracking-[0.1em] uppercase text-ub-muted hover:text-red-400 transition-colors duration-150"
          >
            <LogOut size={15} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
