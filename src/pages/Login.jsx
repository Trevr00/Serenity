import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMail, FiLock } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'

  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' })
    if (apiError) setApiError('')
  }

  const validate = () => {
    const errs = {}
    if (!form.email) errs.email = 'Email is required'
    if (!form.password) errs.password = 'Password is required'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate(from, { replace: true })
    } catch (err) {
      setApiError(err.response?.data?.error || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-cream flex items-center justify-center px-6 pt-20 pb-16"
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="section-subtitle">Welcome Back</p>
          <h1 className="font-serif text-4xl text-charcoal-800 mb-3">Sign In</h1>
          <div className="divider-gold mx-auto" />
        </div>

        <div className="bg-white border border-beige-200 p-8">
          {apiError && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label className="block text-xs tracking-widest uppercase text-charcoal-700/60 mb-1.5">
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-700/30" size={15} />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                  className={`w-full pl-9 pr-4 py-3 border text-sm bg-white outline-none focus:border-gold-400 transition-colors ${
                    errors.email ? 'border-red-400' : 'border-beige-200'
                  }`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase text-charcoal-700/60 mb-1.5">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-700/30" size={15} />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full pl-9 pr-4 py-3 border text-sm bg-white outline-none focus:border-gold-400 transition-colors ${
                    errors.password ? 'border-red-400' : 'border-beige-200'
                  }`}
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 mt-2 disabled:opacity-60"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-charcoal-700/60 mt-6">
            Don't have an account?{' '}
            <Link to="/register" state={{ from }} className="text-gold-500 hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  )
}
