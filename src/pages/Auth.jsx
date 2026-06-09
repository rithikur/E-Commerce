import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem('ub_customer_session')) {
      navigate('/');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const existingCustomers = JSON.parse(localStorage.getItem('ub_customers') || '[]');

    if (isLogin) {
      // Login Logic
      const customer = existingCustomers.find(
        c => c.email.toLowerCase() === formData.email.toLowerCase() && c.password === formData.password
      );

      if (customer) {
        localStorage.setItem('ub_customer_session', JSON.stringify({ id: customer.id, name: customer.name, email: customer.email }));
        window.location.href = '/';
      } else {
        setError('Invalid email or password.');
      }
    } else {
      // Registration Logic
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.');
        return;
      }

      const emailExists = existingCustomers.some(c => c.email.toLowerCase() === formData.email.toLowerCase());
      if (emailExists) {
        setError('Email address is already registered.');
        return;
      }

      const newCustomer = {
        id: `cust_${uuidv4()}`,
        name: formData.name,
        email: formData.email.toLowerCase(),
        phone: formData.phone,
        password: formData.password,
        createdAt: new Date().toISOString()
      };

      existingCustomers.push(newCustomer);
      localStorage.setItem('ub_customers', JSON.stringify(existingCustomers));

      // Auto-login after registration
      localStorage.setItem('ub_customer_session', JSON.stringify({ id: newCustomer.id, name: newCustomer.name, email: newCustomer.email }));
      window.location.href = '/';
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-8 bg-white shadow-sm border border-brand-tertiary/40">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-heading font-semibold text-brand-dark tracking-wide uppercase">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="mt-2 text-sm text-brand-dark/70 tracking-wider">
            {isLogin ? 'Sign in to access your profile.' : 'Join UB Threads for exclusive access.'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm border border-red-100 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-brand-dark mb-1 tracking-wider uppercase">Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-brand-tertiary focus:outline-none focus:ring-1 focus:ring-brand-primary text-brand-dark bg-brand-bg/50"
                placeholder="Rahul Sharma"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1 tracking-wider uppercase">Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-brand-tertiary focus:outline-none focus:ring-1 focus:ring-brand-primary text-brand-dark bg-brand-bg/50"
              placeholder="rahul@example.in"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-brand-dark mb-1 tracking-wider uppercase">Phone Number</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-brand-tertiary focus:outline-none focus:ring-1 focus:ring-brand-primary text-brand-dark bg-brand-bg/50"
                placeholder="+91 98765 43210"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1 tracking-wider uppercase">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-brand-tertiary focus:outline-none focus:ring-1 focus:ring-brand-primary text-brand-dark bg-brand-bg/50"
              placeholder="••••••••"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-brand-dark mb-1 tracking-wider uppercase">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-brand-tertiary focus:outline-none focus:ring-1 focus:ring-brand-primary text-brand-dark bg-brand-bg/50"
                placeholder="••••••••"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-brand-dark text-brand-light font-medium tracking-widest uppercase hover:bg-brand-dark/90 transition-colors mt-8"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-brand-tertiary/40 pt-6">
          <p className="text-sm text-brand-dark/70">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setFormData({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
              }}
              className="ml-2 text-brand-dark font-medium hover:text-brand-primary transition-colors tracking-wide"
            >
              {isLogin ? 'Register Now' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
