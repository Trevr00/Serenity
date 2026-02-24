import { Link } from 'react-router-dom'
import { FiInstagram, FiTwitter, FiFacebook, FiPhone, FiMail, FiMapPin } from 'react-icons/fi'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-charcoal-900 text-beige-200">
      {/* Top band */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="block mb-4">
              <span className="font-serif text-2xl tracking-widest text-white">SERENITY</span>
              <br />
              <span className="text-xs tracking-[0.3em] uppercase text-gold-400">Wellness & Spa</span>
            </Link>
            <p className="text-sm text-beige-300/70 leading-relaxed mt-4">
              A sanctuary of calm in the heart of the city. We exist to restore you — body, mind, and spirit.
            </p>
            <div className="flex gap-4 mt-6">
              {[FiInstagram, FiTwitter, FiFacebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 border border-white/20 flex items-center justify-center text-beige-300/70 hover:border-gold-400 hover:text-gold-400 transition-colors duration-300"
                  aria-label="Social link"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-gold-400 mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', to: '/' },
                { label: 'About Us', to: '/about' },
                { label: 'Services', to: '/services' },
                { label: 'Packages', to: '/packages' },
                { label: 'Referral Program', to: '/referral' },
                { label: 'Book Now', to: '/book' },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-beige-300/70 hover:text-gold-400 transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-gold-400 mb-5">Our Services</h4>
            <ul className="space-y-3">
              {[
                { label: 'Shaving Parlour', to: '/services/shaving-parlour' },
                { label: 'Full Body Massage', to: '/services/full-body-massage' },
                { label: 'Mini-Gym', to: '/services/mini-gym' },
                { label: 'Sauna', to: '/services/sauna' },
                { label: 'Steam Bath', to: '/services/steam-bath' },
                { label: 'Manicure & Pedicure', to: '/services/manicure-pedicure' },
                { label: 'Hairstylist', to: '/services/hairstylist' },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-beige-300/70 hover:text-gold-400 transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-gold-400 mb-5">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-beige-300/70">
                <FiMapPin className="mt-0.5 text-gold-400 shrink-0" size={16} />
                14 Tranquil Avenue, Victoria Island, Lagos, Nigeria
              </li>
              <li className="flex items-center gap-3 text-sm text-beige-300/70">
                <FiPhone className="text-gold-400 shrink-0" size={16} />
                +234 800 SERENITY
              </li>
              <li className="flex items-center gap-3 text-sm text-beige-300/70">
                <FiMail className="text-gold-400 shrink-0" size={16} />
                hello@serenitywellness.com
              </li>
            </ul>
            <div className="mt-6">
              <h5 className="text-xs tracking-widest uppercase text-gold-400 mb-2">Hours</h5>
              <p className="text-sm text-beige-300/70">Mon – Fri: 7:00am – 9:00pm</p>
              <p className="text-sm text-beige-300/70">Sat – Sun: 8:00am – 8:00pm</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-beige-300/40">
          &copy; {year} Serenity Wellness & Spa. All rights reserved.
        </p>
        <p className="text-xs text-beige-300/40">
          Crafted with care for your well-being.
        </p>
      </div>
    </footer>
  )
}
