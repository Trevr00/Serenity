import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  {
    label: 'Services',
    to: '/services',
    dropdown: [
      { label: 'Shaving Parlour', to: '/services/shaving-parlour' },
      { label: 'Full Body Massage', to: '/services/full-body-massage' },
      { label: 'Mini-Gym', to: '/services/mini-gym' },
      { label: 'Sauna', to: '/services/sauna' },
      { label: 'Steam Bath', to: '/services/steam-bath' },
      { label: 'Manicure & Pedicure', to: '/services/manicure-pedicure' },
      { label: 'Hairstylist', to: '/services/hairstylist' },
    ],
  },
  { label: 'Packages', to: '/packages' },
  { label: 'Referral', to: '/referral' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setServicesOpen(false)
    setMobileServicesOpen(false)
  }, [location])

  const isHome = location.pathname === '/'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-beige-200'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="flex flex-col leading-none group">
          <span
            className={`font-serif text-2xl font-light tracking-widest transition-colors duration-300 ${
              scrolled || !isHome ? 'text-charcoal-800' : 'text-white'
            } group-hover:text-gold-500`}
          >
            SERENITY
          </span>
          <span
            className={`text-xs tracking-[0.3em] uppercase font-sans transition-colors duration-300 ${
              scrolled || !isHome ? 'text-gold-500' : 'text-beige-200'
            }`}
          >
            Wellness & Spa
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) =>
            link.dropdown ? (
              <li
                key={link.label}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-1 text-sm tracking-widest uppercase font-sans transition-colors duration-300 pb-1 border-b ${
                      isActive
                        ? 'border-gold-400 text-gold-500'
                        : `border-transparent ${
                            scrolled || !isHome
                              ? 'text-charcoal-700 hover:text-gold-500'
                              : 'text-white/90 hover:text-white'
                          }`
                    }`
                  }
                >
                  {link.label}
                  <FiChevronDown
                    className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                    size={14}
                  />
                </NavLink>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-white shadow-xl border border-beige-100 py-2"
                    >
                      {link.dropdown.map((sub) => (
                        <li key={sub.to}>
                          <NavLink
                            to={sub.to}
                            className={({ isActive }) =>
                              `block px-5 py-2.5 text-xs tracking-widest uppercase font-sans transition-colors duration-200 ${
                                isActive
                                  ? 'text-gold-500 bg-beige-50'
                                  : 'text-charcoal-700 hover:text-gold-500 hover:bg-beige-50'
                              }`
                            }
                          >
                            {sub.label}
                          </NavLink>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={link.label}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `text-sm tracking-widest uppercase font-sans transition-colors duration-300 pb-1 border-b ${
                      isActive
                        ? 'border-gold-400 text-gold-500'
                        : `border-transparent ${
                            scrolled || !isHome
                              ? 'text-charcoal-700 hover:text-gold-500'
                              : 'text-white/90 hover:text-white'
                          }`
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            )
          )}
          <li>
            <Link
              to="/book"
              className="ml-2 px-6 py-2.5 bg-red-600 text-white text-xs tracking-widest uppercase font-sans font-medium transition-all duration-300 hover:bg-gold-600 hover:shadow-md"
            >
              Book Now
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className={`lg:hidden p-2 transition-colors ${
            scrolled || !isHome ? 'text-charcoal-800' : 'text-white'
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-beige-100 overflow-hidden"
          >
            <ul className="px-6 py-4 space-y-1">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <li key={link.label}>
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="w-full flex items-center justify-between py-3 text-sm tracking-widest uppercase font-sans text-charcoal-700"
                    >
                      {link.label}
                      <FiChevronDown
                        className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`}
                        size={14}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-4 space-y-1 overflow-hidden"
                        >
                          <li>
                            <NavLink
                              to={link.to}
                              className={({ isActive }) =>
                                `block py-2 text-xs tracking-widest uppercase font-sans ${
                                  isActive ? 'text-gold-500' : 'text-charcoal-600 hover:text-gold-500'
                                }`
                              }
                            >
                              All Services
                            </NavLink>
                          </li>
                          {link.dropdown.map((sub) => (
                            <li key={sub.to}>
                              <NavLink
                                to={sub.to}
                                className={({ isActive }) =>
                                  `block py-2 text-xs tracking-widest uppercase font-sans ${
                                    isActive ? 'text-gold-500' : 'text-charcoal-600 hover:text-gold-500'
                                  }`
                                }
                              >
                                {sub.label}
                              </NavLink>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                ) : (
                  <li key={link.label}>
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      className={({ isActive }) =>
                        `block py-3 text-sm tracking-widest uppercase font-sans ${
                          isActive ? 'text-gold-500' : 'text-charcoal-700 hover:text-gold-500'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                )
              )}
              <li className="pt-2">
                <Link
                  to="/book"
                  className="block text-center py-3 bg-gold-500 text-white text-xs tracking-widest uppercase font-sans"
                >
                  Book Now
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
