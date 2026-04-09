import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import {
  MdDashboard,
  MdPeople,
  MdCalendarToday,
  MdInventory2,
  MdSettings,
  MdSecurity,
  MdMenu,
  MdClose,
  MdLogout,
  MdOpenInNew,
  MdPalette,
} from 'react-icons/md'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: MdDashboard, end: true },
  { to: '/admin/users', label: 'Users', icon: MdPeople },
  { to: '/admin/bookings', label: 'Bookings', icon: MdCalendarToday },
  { to: '/admin/packages', label: 'Packages', icon: MdInventory2 },
  { to: '/admin/appearance', label: 'Appearance', icon: MdPalette },
  { to: '/admin/settings', label: 'Settings', icon: MdSettings },
  { to: '/admin/audit', label: 'Audit Logs', icon: MdSecurity },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const NavItems = ({ onItemClick }) => (
    <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
      {navItems.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onItemClick}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
              isActive
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'text-gray-400 hover:text-gray-100 hover:bg-white/5'
            }`
          }
        >
          <Icon className="w-5 h-5 flex-shrink-0" />
          <span className={`transition-all duration-200 overflow-hidden whitespace-nowrap ${
            sidebarOpen ? 'opacity-100 max-w-xs' : 'opacity-0 max-w-0'
          }`}>
            {label}
          </span>
        </NavLink>
      ))}
    </nav>
  )

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col bg-gray-900 border-r border-white/10 transition-all duration-300 ${
          sidebarOpen ? 'w-60' : 'w-16'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-3 h-16 border-b border-white/10 flex-shrink-0">
          <div className={`flex items-center gap-2 overflow-hidden transition-all duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
            <span className="text-amber-400 font-serif text-lg font-semibold whitespace-nowrap">Serenity</span>
            <span className="text-gray-500 text-xs whitespace-nowrap">Admin</span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-100 hover:bg-white/5 transition-colors flex-shrink-0"
          >
            <MdMenu className="w-5 h-5" />
          </button>
        </div>

        <NavItems />

        {/* Bottom user section */}
        <div className="border-t border-white/10 p-3 flex-shrink-0">
          <div className={`flex items-center gap-3 overflow-hidden ${sidebarOpen ? 'mb-2' : 'hidden'}`}>
            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
              <span className="text-amber-400 text-xs font-semibold">
                {user?.name?.[0]?.toUpperCase()}
              </span>
            </div>
            <div className="overflow-hidden">
              <p className="text-gray-200 text-sm font-medium truncate">{user?.name}</p>
              <p className="text-gray-500 text-xs truncate">{user?.email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 flex-1 px-2 py-1.5 rounded-lg text-gray-400 hover:text-gray-100 hover:bg-white/5 text-xs transition-colors"
              title="View site"
            >
              <MdOpenInNew className="w-4 h-4 flex-shrink-0" />
              {sidebarOpen && <span>Site</span>}
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 flex-1 px-2 py-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 text-xs transition-colors"
              title="Logout"
            >
              <MdLogout className="w-4 h-4 flex-shrink-0" />
              {sidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/60 z-40"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-60 bg-gray-900 border-r border-white/10 flex flex-col z-50"
            >
              <div className="flex items-center justify-between px-4 h-16 border-b border-white/10">
                <span className="text-amber-400 font-serif text-lg font-semibold">Serenity Admin</span>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-gray-100"
                >
                  <MdClose className="w-5 h-5" />
                </button>
              </div>
              <NavItems onItemClick={() => setMobileSidebarOpen(false)} />
              <div className="border-t border-white/10 p-4">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 text-sm transition-colors"
                >
                  <MdLogout className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-gray-900/50 border-b border-white/10 flex items-center px-4 gap-4 flex-shrink-0">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="lg:hidden p-1.5 text-gray-400 hover:text-gray-100"
          >
            <MdMenu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
              <span className="text-amber-400 text-xs font-semibold">
                {user?.name?.[0]?.toUpperCase()}
              </span>
            </div>
            <div className="hidden sm:block">
              <p className="text-gray-200 text-sm font-medium leading-none">{user?.name}</p>
              <p className="text-gray-500 text-xs mt-0.5">Administrator</p>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
