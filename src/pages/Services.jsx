import { motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import ServiceCard from '../components/ServiceCard'
import { services } from '../data/services'
import { Link } from 'react-router-dom'

export default function Services() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <PageHero
        title="Our Services"
        subtitle="What We Offer"
        image="https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1400&q=80"
      />

      {/* Intro */}
      <section className="py-16 bg-cream">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-subtitle">Premium Experiences</p>
            <h2 className="section-title mb-5">Seven Paths to Restoration</h2>
            <div className="divider-gold" />
            <p className="text-charcoal-700/70 leading-relaxed">
              Each service at Serenity is a carefully designed ritual — combining expert technique,
              premium products, and a calming environment to deliver results that you will see,
              feel, and carry with you long after you leave.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-beige-100 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto px-6"
        >
          <p className="section-subtitle">Ready to Begin?</p>
          <h2 className="text-3xl font-serif font-light text-charcoal-800 mb-6">
            Book Any Service Today
          </h2>
          <Link to="/book" className="btn-primary">
            Book Now
          </Link>
        </motion.div>
      </section>
    </motion.div>
  )
}
