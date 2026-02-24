import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCheck, FiArrowLeft, FiClock, FiTag } from 'react-icons/fi'
import { services } from '../data/services'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

export default function ServiceDetailTemplate({ service }) {
  const otherServices = services.filter((s) => s.id !== service.id).slice(0, 3)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      {/* Hero */}
      <section
        className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden"
        style={{
          backgroundImage: `url(${service.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/50 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-14 w-full">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-beige-300/70 hover:text-gold-400 transition-colors mb-6"
          >
            <FiArrowLeft size={14} /> All Services
          </Link>
          <p className="text-xs tracking-widest uppercase text-gold-400 mb-2">{service.tagline}</p>
          <h1 className="text-4xl md:text-6xl font-serif font-light text-white">{service.title}</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-3 gap-12">
          {/* Description */}
          <div className="lg:col-span-2">
            <motion.div {...fadeUp}>
              <p className="section-subtitle">About This Service</p>
              <h2 className="section-title mb-5">{service.title}</h2>
              <div className="divider-gold-left" />
              <p className="text-charcoal-700/70 leading-relaxed text-base mb-8">
                {service.description}
              </p>

              {/* Features */}
              <h3 className="font-serif text-2xl text-charcoal-800 mb-5">What's Included</h3>
              <ul className="space-y-3 mb-10">
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-charcoal-700">
                    <FiCheck className="text-gold-500 mt-0.5 shrink-0" size={16} />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Packages table */}
              <h3 className="font-serif text-2xl text-charcoal-800 mb-5">Pricing Options</h3>
              <div className="overflow-hidden border border-beige-200">
                {service.packages.map((pkg, i) => (
                  <div
                    key={pkg.name}
                    className={`flex items-center justify-between px-6 py-4 ${
                      i % 2 === 0 ? 'bg-beige-50' : 'bg-white'
                    }`}
                  >
                    <div>
                      <p className="font-sans font-medium text-charcoal-800 text-sm">{pkg.name}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="flex items-center gap-1 text-xs text-charcoal-700/50">
                          <FiClock size={11} /> {pkg.duration}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="flex items-center gap-1 text-xs text-charcoal-700/50">
                        <FiTag size={11} />
                        <span className="font-serif text-lg text-gold-500 font-light">
                          KSh {pkg.price.toLocaleString()}
                        </span>
                      </span>
                      <Link
                        to="/book"
                        className="px-5 py-2 text-xs tracking-widest uppercase border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-white transition-all duration-200"
                      >
                        Book
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div>
            <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
              {/* Quick info */}
              <div className="bg-white p-6 border border-beige-200 mb-6 card-shadow">
                <h4 className="text-xs tracking-widest uppercase text-gold-500 mb-4">Quick Info</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-charcoal-700/50">Duration</span>
                    <span className="font-medium text-charcoal-800">{service.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-charcoal-700/50">Starting From</span>
                    <span className="font-serif text-gold-500 text-lg font-light">
                      KSh {service.priceFrom.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA box */}
              <div className="bg-charcoal-900 p-6 text-center">
                <p className="text-xs tracking-widest uppercase text-gold-400 mb-2">Ready?</p>
                <h3 className="font-serif text-2xl font-light text-white mb-4">
                  Book {service.title}
                </h3>
                <Link to="/book" className="btn-primary w-full block py-3.5">
                  Reserve Your Spot
                </Link>
              </div>

              {/* Other services */}
              <div className="mt-6">
                <h4 className="text-xs tracking-widest uppercase text-gold-500 mb-4">
                  Explore Other Services
                </h4>
                <ul className="space-y-3">
                  {otherServices.map((s) => (
                    <li key={s.id}>
                      <Link
                        to={`/services/${s.slug}`}
                        className="flex items-center gap-3 group"
                      >
                        <img
                          src={s.image}
                          alt={s.title}
                          className="w-12 h-12 object-cover shrink-0"
                        />
                        <div>
                          <p className="text-sm font-medium text-charcoal-800 group-hover:text-gold-500 transition-colors">
                            {s.title}
                          </p>
                          <p className="text-xs text-charcoal-700/50">From KSh {s.priceFrom.toLocaleString()}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
