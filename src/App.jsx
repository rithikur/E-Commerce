import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './components/layout/PublicLayout';
import LandingPage from './pages/LandingPage';
import Shop from './pages/Shop';
import Auth from './pages/Auth';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import CustomerOrders from './pages/CustomerOrders';

import Login from './pages/admin/Login';
import Categories from './pages/admin/Categories';
import Products from './pages/admin/Products';
import Customers from './pages/admin/Customers';
import Orders from './pages/admin/Orders';

import Preloader from './components/ui/Preloader';
import { seedDatabase } from './utils/seedData';

// Execute immediately on module load so Vite HMR picks it up without a hard refresh
seedDatabase();

// Protected Route wrapper for Admin
function ProtectedAdminRoute({ children }) {
  const isAuth = localStorage.getItem('ub_admin_session') === 'true';
  if (!isAuth) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

// Protected Route wrapper for Customer
function ProtectedCustomerRoute({ children }) {
  const isAuth = localStorage.getItem('ub_customer_session');
  if (!isAuth) {
    return <Navigate to="/auth" replace />;
  }
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Preloader />
      <Routes>
        {/* Public Routes with Navbar */}
        <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
        <Route path="/shop" element={<PublicLayout><Shop /></PublicLayout>} />
        <Route path="/auth" element={<PublicLayout><Auth /></PublicLayout>} />
        <Route path="/product/:id" element={<PublicLayout><ProductDetail /></PublicLayout>} />
        <Route path="/cart" element={<PublicLayout><Cart /></PublicLayout>} />
        
        {/* Protected Customer Routes */}
        <Route 
          path="/checkout" 
          element={<ProtectedCustomerRoute><PublicLayout><Checkout /></PublicLayout></ProtectedCustomerRoute>} 
        />
        <Route 
          path="/my-orders" 
          element={<ProtectedCustomerRoute><PublicLayout><CustomerOrders /></PublicLayout></ProtectedCustomerRoute>} 
        />
        
        {/* Admin Auth Route */}
        <Route path="/admin/login" element={<Login />} />
        
        {/* Protected Admin Routes */}
        <Route 
          path="/admin/categories" 
          element={<ProtectedAdminRoute><Categories /></ProtectedAdminRoute>} 
        />
        <Route 
          path="/admin/products" 
          element={<ProtectedAdminRoute><Products /></ProtectedAdminRoute>} 
        />
        <Route 
          path="/admin/customers" 
          element={<ProtectedAdminRoute><Customers /></ProtectedAdminRoute>} 
        />
        <Route 
          path="/admin/orders" 
          element={<ProtectedAdminRoute><Orders /></ProtectedAdminRoute>} 
        />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
