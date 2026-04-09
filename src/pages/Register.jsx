import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiUser, FiMail, FiPhone, FiLock } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
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
    if (!form.name || form.name.trim().length < 2) errs.name = 'Full name is required'
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email is required'
    if (!form.phone) errs.phone = 'Phone number is required'
    if (!form.password || form.password.length < 8) errs.password = 'Min 8 characters'
    else if (!/[A-Z]/.test(form.password)) errs.password = 'Must include an uppercase letter'
    else if (!/[a-z]/.test(form.password)) errs.password = 'Must include a lowercase letter'
    else if (!/[0-9]/.test(form.password)) errs.password = 'Must include a number'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    try {
      await register(form.name.trim(), form.email, form.password, form.phone)
      navigate(from, { replace: true })
    } catch (err) {
      setApiError(err.response?.data?.error || 'Registration failed. Please try again.')
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
          <p className="section-subtitle">Join Us</p>
          <h1 className="font-serif text-4xl text-charcoal-800 mb-3">Create Account</h1>
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
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-700/30" size={15} />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Amara Okonkwo"
                  className={`w-full pl-9 pr-4 py-3 border text-sm bg-white outline-none focus:border-gold-400 transition-colors ${
                    errors.name ? 'border-red-400' : 'border-beige-200'
                  }`}
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

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
                  placeholder="amara@email.com"
                  className={`w-full pl-9 pr-4 py-3 border text-sm bg-white outline-none focus:border-gold-400 transition-colors ${
                    errors.email ? 'border-red-400' : 'border-beige-200'
                  }`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase text-charcoal-700/60 mb-1.5">
                Phone
              </label>
              <div className="relative">
                <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-700/30" size={15} />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="0712 345 678"
                  className={`w-full pl-9 pr-4 py-3 border text-sm bg-white outline-none focus:border-gold-400 transition-colors ${
                    errors.phone ? 'border-red-400' : 'border-beige-200'
                  }`}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
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
              <p className="text-charcoal-700/40 text-xs mt-1.5">
                Min 8 characters with uppercase, lowercase, and a number
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 mt-2 disabled:opacity-60"
            >
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-charcoal-700/60 mt-6">
            Already have an account?{' '}
            <Link to="/login" state={{ from }} className="text-gold-500 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  )
}
