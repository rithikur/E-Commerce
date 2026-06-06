import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/admin/Login';
import Categories from './pages/admin/Categories';

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
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
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
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
