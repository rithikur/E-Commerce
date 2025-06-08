import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminLogin } from '../../utils/store'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('ub_admin_session')) navigate('/admin')
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      const ok = adminLogin(email, password)
      if (ok) {
        navigate('/admin')
      } else {
        setError('Invalid email or password')
        setLoading(false)
      }
    }, 600)
  }

  return (
    <div className="min-h-screen bg-ub-darkest flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-10">
          <h1 className="font-cormorant italic text-white text-4xl">UB Threads</h1>
          <div className="w-12 h-px bg-ub-mid mx-auto my-3" />
          <p className="font-jost text-ub-muted text-[10px] tracking-[0.35em] uppercase">Admin Access</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-ub-lightest p-8 space-y-4">
          <div>
            <label className="block font-jost text-[10px] tracking-[0.15em] uppercase text-ub-dark mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="admin@ubthreads.com"
              className="w-full border border-ub-muted bg-transparent px-3 py-2.5 font-jost text-sm text-ub-darkest placeholder:text-ub-muted focus:outline-none focus:border-ub-dark"
            />
          </div>
          <div>
            <label className="block font-jost text-[10px] tracking-[0.15em] uppercase text-ub-dark mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full border border-ub-muted bg-transparent px-3 py-2.5 font-jost text-sm text-ub-darkest placeholder:text-ub-muted focus:outline-none focus:border-ub-dark"
            />
          </div>
          {error && (
            <p className="font-jost text-xs text-red-600">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ub-darkest text-white font-jost text-xs tracking-[0.2em] uppercase py-3 hover:bg-ub-dark transition-colors duration-200 disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>
      </div>
    </div>
  )
}
