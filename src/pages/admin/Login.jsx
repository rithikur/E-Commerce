import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (email === 'admin@ubthreads.com' && password === 'admin123') {
      localStorage.setItem('ub_admin_session', 'true');
      navigate('/admin/categories');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h1 
          className="text-3xl font-heading font-semibold text-brand-dark cursor-pointer tracking-wide" 
          onClick={() => navigate('/')}
        >
          UB THREADS
        </h1>
        <h2 className="mt-6 text-xl text-brand-dark/80 tracking-tight">
          Admin Portal
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-none sm:px-10 border border-brand-tertiary/20">
          <form className="space-y-6" onSubmit={handleLogin}>
            
            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 border border-red-100 text-center">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-brand-dark mb-1">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-brand-tertiary/60 placeholder-brand-dark/30 text-brand-dark focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm transition-colors rounded-none"
                placeholder="admin@ubthreads.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-dark mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-brand-tertiary/60 placeholder-brand-dark/30 text-brand-dark focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm transition-colors rounded-none"
                placeholder="••••••••"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent shadow-sm text-sm font-medium text-brand-light bg-brand-dark hover:bg-brand-dark/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-dark transition-colors rounded-none tracking-wide"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
