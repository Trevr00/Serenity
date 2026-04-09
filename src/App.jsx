import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Packages from './pages/Packages'
import Referral from './pages/Referral'
import BookNow from './pages/BookNow'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import ShavingParlour from './pages/services/ShavingParlour'
import FullBodyMassage from './pages/services/FullBodyMassage'
import MiniGym from './pages/services/MiniGym'
import Sauna from './pages/services/Sauna'
import SteamBath from './pages/services/SteamBath'
import ManicurePedicure from './pages/services/ManicurePedicure'
import Hairstylist from './pages/services/Hairstylist'
import ScrollToTop from './components/ScrollToTop'
import { AuthProvider } from './context/AuthContext'
import { SiteSettingsProvider } from './context/SiteSettingsContext'
import { ThemeProvider } from './context/ThemeContext'
import AnnouncementBanner from './components/AnnouncementBanner'
import AdminRoute from './admin/AdminRoute'
import AdminLayout from './admin/AdminLayout'
import AdminDashboard from './admin/pages/AdminDashboard'
import AdminUsers from './admin/pages/AdminUsers'
import AdminBookings from './admin/pages/AdminBookings'
import AdminPackages from './admin/pages/AdminPackages'
import AdminSettings from './admin/pages/AdminSettings'
import AdminAuditLogs from './admin/pages/AdminAuditLogs'
import AdminAppearance from './admin/pages/AdminAppearance'

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
      <SiteSettingsProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* ── Admin (no Navbar/Footer, own layout) ── */}
          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="packages" element={<AdminPackages />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="audit" element={<AdminAuditLogs />} />
            <Route path="appearance" element={<AdminAppearance />} />
          </Route>

          {/* ── Public / auth routes (with Navbar + Footer) ── */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex flex-col">
                <AnnouncementBanner />
                <Navbar />
                <main className="flex-grow">
                  <AnimatePresence mode="wait">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/services/shaving-parlour" element={<ShavingParlour />} />
                      <Route path="/services/full-body-massage" element={<FullBodyMassage />} />
                      <Route path="/services/mini-gym" element={<MiniGym />} />
                      <Route path="/services/sauna" element={<Sauna />} />
                      <Route path="/services/steam-bath" element={<SteamBath />} />
                      <Route path="/services/manicure-pedicure" element={<ManicurePedicure />} />
                      <Route path="/services/hairstylist" element={<Hairstylist />} />
                      <Route path="/packages" element={<Packages />} />
                      <Route path="/referral" element={<Referral />} />
                      <Route path="/book" element={<BookNow />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                    </Routes>
                  </AnimatePresence>
                </main>
                <Footer />
              </div>
            }
          />
        </Routes>
      </Router>
      </SiteSettingsProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
