import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiCheck } from 'react-icons/fi'
import PageHero from '../components/PageHero'
import PackageCard from '../components/PackageCard'
import { packages } from '../data/packages'

const faqs = [
  {
    q: 'Can I share a package with a friend?',
    a: 'Packages are priced per person. However, we offer special couples or group rates — contact us to learn more.',
  },
  {
    q: 'How long are packages valid?',
    a: 'Once purchased, packages can be redeemed within 6 months of the date of purchase.',
  },
  {
    q: 'Can I customise a package?',
    a: 'Absolutely. Reach out to our team and we\'ll tailor a bespoke package to your preferences and budget.',
  },
  {
    q: 'Do packages include tips or gratuity?',
    a: 'Packages do not include gratuity. Tipping is always appreciated but entirely at your discretion.',
  },
]

export default function Packages() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <PageHero
        title="Wellness Packages"
        subtitle="Curated Bundles"
        image="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1400&q=80"
      />

      {/* Intro */}
      <section className="py-16 bg-cream">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-subtitle">More Value, More Bliss</p>
            <h2 className="section-title mb-5">The Best of Serenity, Bundled</h2>
            <div className="divider-gold" />
            <p className="text-charcoal-700/70 leading-relaxed">
              Our packages are thoughtfully curated to combine the services that work best together —
              so you can enjoy a deeper, more complete wellness experience at exceptional value.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Package Cards */}
      <section className="py-16 bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {packages.map((pkg, i) => (
              <PackageCard key={pkg.id} pkg={pkg} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Custom package CTA */}
      <section className="py-20 bg-beige-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="section-subtitle">Something Special</p>
            <h2 className="section-title mb-5">Bespoke Packages</h2>
            <div className="divider-gold-left" />
            <p className="text-charcoal-700/70 leading-relaxed mb-5">
              Can't find exactly what you're looking for? Let us create a completely personalised
              wellness experience tailored to your needs, preferences, and occasion — whether it's a
              birthday treat, corporate wellness day, or a romantic couple's retreat.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Birthday & special occasion packages',
                'Corporate wellness packages',
                'Couples retreat experiences',
                'Group bookings for 4+',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-charcoal-700">
                  <FiCheck className="text-gold-500 shrink-0" size={15} />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/contact" className="btn-outline">
              Get in Touch
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <img
              src="https://images.unsplash.com/photo-1583416750470-965b2707b355?w=800&q=80"
              alt="Bespoke packages"
              className="w-full h-[380px] object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="section-subtitle">Questions</p>
            <h2 className="section-title">Package FAQs</h2>
            <div className="divider-gold" />
          </motion.div>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white p-6 border border-beige-100 card-shadow"
              >
                <h3 className="font-sans font-semibold text-charcoal-800 mb-2">{faq.q}</h3>
                <p className="text-sm text-charcoal-700/65 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
