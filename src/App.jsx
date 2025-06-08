import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminCategories from './pages/admin/AdminCategories'

// Coming soon page — placeholder for storefront (UI002-UI004)
function ComingSoon() {
  return (
    <div className="min-h-screen bg-ub-darkest flex items-center justify-center">
      <div className="bg-ub-lightest p-12 text-center max-w-sm w-full">
        <h1 className="font-cormorant italic text-4xl text-ub-darkest mb-2">UB Threads</h1>
        <div className="w-16 h-px bg-ub-mid mx-auto my-4" />
        <p className="font-jost text-xs tracking-[0.3em] text-ub-dark uppercase mb-6">
          Storefront Launching Soon
        </p>
        <a
          href="/admin"
          className="font-jost text-xs tracking-[0.15em] uppercase border border-ub-darkest px-7 py-3 text-ub-darkest hover:bg-ub-darkest hover:text-white transition-colors duration-200"
        >
          Admin Panel →
        </a>
      </div>
    </div>
  )
}

// Guard — redirects to login if not authenticated
function AdminGuard({ children }) {
  const session = localStorage.getItem('ub_admin_session')
  if (!session) return <Navigate to="/admin/login" replace />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Storefront — coming soon for now */}
        <Route path="/" element={<ComingSoon />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
        <Route path="/admin/categories" element={<AdminGuard><AdminCategories /></AdminGuard>} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
