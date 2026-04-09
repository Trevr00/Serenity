import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'

export default function ServiceCard({ service, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative overflow-hidden bg-white card-shadow"
    >
      {/* Image */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient overlay — fades in from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/55 via-charcoal-900/15 to-transparent group-hover:from-charcoal-900/20 group-hover:via-transparent transition-all duration-500" />
        {/* Frosted icon badge */}
        <span className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-lg text-white/90">
          {service.icon}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-xs tracking-widest uppercase text-gold-500 mb-1">{service.duration}</p>
        <h3 className="text-xl font-serif font-light text-charcoal-800 mb-2">{service.title}</h3>
        <p className="text-sm text-charcoal-700/70 leading-relaxed mb-4 line-clamp-3">
          {service.description}
        </p>
        <div className="flex items-center justify-between border-t border-beige-100 pt-4">
          <span className="text-sm text-charcoal-700">
            From <strong className="text-gold-500 font-semibold">KSh {service.priceFrom.toLocaleString()}</strong>
          </span>
          <Link
            to={`/services/${service.slug}`}
            className="flex items-center gap-1.5 text-xs tracking-widest uppercase text-gold-500 hover:text-gold-600 font-sans font-medium transition-colors duration-200 group/link"
          >
            Explore
            <FiArrowRight
              size={14}
              className="transition-transform duration-200 group-hover/link:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
