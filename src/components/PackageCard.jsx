import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCheck } from 'react-icons/fi'

const colorMap = {
  sage: {
    accent: 'text-sage-600',
    border: 'border-sage-300',
    badge: 'bg-sage-100 text-sage-700',
    btn: 'border-sage-600 text-sage-600 hover:bg-sage-600 hover:text-white rounded-full',
  },
  gold: {
    accent: 'text-gold-500',
    border: 'border-gold-400',
    badge: 'bg-gold-300/30 text-gold-600',
    btn: 'border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-white rounded-full',
  },
  charcoal: {
    accent: 'text-charcoal-700',
    border: 'border-charcoal-700',
    badge: 'bg-charcoal-700 text-white',
    btn: 'border-charcoal-700 text-charcoal-700 hover:bg-charcoal-700 hover:text-white rounded-full',
  },
}

export default function PackageCard({ pkg, index = 0 }) {
  const colors = colorMap[pkg.color] || colorMap.gold

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative bg-white border-2 ${colors.border} p-8 flex flex-col card-shadow overflow-hidden ${
        pkg.popular ? 'scale-105' : ''
      }`}
    >
      {pkg.popular && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1 bg-gold-500 text-white text-xs tracking-widest uppercase font-sans rounded-full">
          Most Popular
        </span>
      )}
      <div className="mb-6">
        <p className="text-xs tracking-widest uppercase text-charcoal-700/50 mb-1">{pkg.duration}</p>
        <h3 className={`text-3xl font-serif font-light mb-1 ${colors.accent}`}>{pkg.name}</h3>
        <p className="text-sm text-charcoal-700/60">{pkg.tagline}</p>
      </div>

      <div className="mb-6">
        <span className={`text-4xl font-serif font-light ${colors.accent}`}>
          KSh {pkg.price.toLocaleString()}
        </span>
        <span className="text-sm text-charcoal-700/50 ml-1">/ person</span>
      </div>

      <ul className="space-y-3 mb-8 flex-grow">
        {pkg.includes.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-charcoal-700">
            <FiCheck className={`mt-0.5 shrink-0 ${colors.accent}`} size={15} />
            {item}
          </li>
        ))}
      </ul>

      <Link
        to="/book"
        className={`block text-center py-3 border text-xs tracking-widest uppercase font-sans font-medium transition-all duration-300 ${colors.btn}`}
      >
        Book This Package
      </Link>
    </motion.div>
  )
}
