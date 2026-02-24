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
import ShavingParlour from './pages/services/ShavingParlour'
import FullBodyMassage from './pages/services/FullBodyMassage'
import MiniGym from './pages/services/MiniGym'
import Sauna from './pages/services/Sauna'
import SteamBath from './pages/services/SteamBath'
import ManicurePedicure from './pages/services/ManicurePedicure'
import Hairstylist from './pages/services/Hairstylist'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
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
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
