import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './components/layout/PublicLayout';
import LandingPage from './pages/LandingPage';
import Shop from './pages/Shop';
import Auth from './pages/Auth';
import Login from './pages/admin/Login';
import Categories from './pages/admin/Categories';
import Products from './pages/admin/Products';
import Customers from './pages/admin/Customers';
import Preloader from './components/ui/Preloader';
import { seedDatabase } from './utils/seedData';

// Execute immediately on module load so Vite HMR picks it up without a hard refresh
seedDatabase();

// Protected Route wrapper
function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem('ub_admin_session') === 'true';
  if (!isAuth) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Preloader />
      <Routes>
        {/* Public Routes with Navbar */}
        <Route 
          path="/" 
          element={<PublicLayout><LandingPage /></PublicLayout>} 
        />
        <Route 
          path="/shop" 
          element={<PublicLayout><Shop /></PublicLayout>} 
        />
        <Route 
          path="/auth" 
          element={<PublicLayout><Auth /></PublicLayout>} 
        />
        
        {/* Admin Auth Route */}
        <Route path="/admin/login" element={<Login />} />
        
        {/* Protected Admin Routes */}
        <Route 
          path="/admin/categories" 
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/products" 
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/customers" 
          element={
            <ProtectedRoute>
              <Customers />
            </ProtectedRoute>
          } 
        />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
