import { motion } from 'framer-motion'

export default function PageHero({ title, subtitle, image, overlay = 'from-charcoal-900/80 via-charcoal-900/50 to-transparent' }) {
  return (
    <section
      className="relative h-72 md:h-96 flex items-end overflow-hidden"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${overlay}`} />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-12 w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-widest uppercase text-gold-400 mb-2"
        >
          {subtitle}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-serif font-light text-white leading-tight"
        >
          {title}
        </motion.h1>
      </div>
    </section>
  )
}
