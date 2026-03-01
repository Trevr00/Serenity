import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiAward, FiHeart, FiStar } from 'react-icons/fi'
import ServiceCard from '../components/ServiceCard'
import PackageCard from '../components/PackageCard'
import { services } from '../data/services'
import { packages } from '../data/packages'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
}

const stats = [
  { value: '5,000+', label: 'Happy Clients' },
  { value: '7+', label: 'Premium Services' },
  { value: '10+', label: 'Expert Staff' },
  { value: '4.9★', label: 'Average Rating' },
]

const values = [
  {
    icon: FiAward,
    title: 'Excellence in Every Detail',
    desc: 'From our curated product range to our expert therapists, quality is our baseline — not our aspiration.',
  },
  {
    icon: FiHeart,
    title: 'Your Comfort First',
    desc: 'Every space, scent, and service is designed around your ultimate comfort and relaxation.',
  },
  {
    icon: FiStar,
    title: 'Personalized Experiences',
    desc: 'No two clients are the same. We tailor every visit to your individual needs and preferences.',
  },
]

const testimonials = [
  {
    name: 'Njeri Bulogosi',
    title: 'Regular Visitor',
    quote:
      'After every visit to Serenity, my skin feels incredibly refreshed and looks visibly radiant. The facials and massages have truly transformed my complexion. I always leave feeling like a completely new person.',
  },
  {
    name: 'Jackson Alvin',
    title: 'Refresh Package Regular',
    quote:
      'The grooming services here are exceptional. My skin feels so rejuvenated and looks so much clearer after their treatments. Coming to Serenity is now my go-to for that glowing, revitalized feeling.',
  },
  {
    name: 'Bertha Muthoni',
    title: 'Restore Package Devotee',
    quote:
      'I walked in feeling exhausted and walked out completely renewed. My skin has never looked better, and the whole experience left me feeling so refreshed and glowing. Serenity is my ultimate wellness sanctuary in Nairobi.',
  },
]

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1743286159555-ea765c1bc5e6?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/70 via-charcoal-900/50 to-charcoal-900/80" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs tracking-[0.4em] uppercase text-gold-400 mb-6"
          >
            Premium Wellness & Grooming
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="font-serif font-light text-white text-5xl sm:text-6xl md:text-7xl leading-[1.1] mb-6"
          >
            Where Calm Becomes
            <br />
            <em className="text-gold-400">Your Standard</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-beige-200/80 text-lg max-w-xl mx-auto mb-10 leading-relaxed font-light"
          >
            Discover a sanctuary of premium grooming, therapeutic massage, and rejuvenating spa
            rituals — crafted for those who value excellence.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/book"
              className="px-10 py-4 bg-gold-500 text-white text-xs tracking-widest uppercase font-sans font-medium hover:bg-gold-600 transition-all duration-300 hover:shadow-xl"
            >
              Book Your Experience
            </Link>
            <Link
              to="/services"
              className="px-10 py-4 border border-white/40 text-white text-xs tracking-widest uppercase font-sans font-medium hover:border-white hover:bg-white/10 transition-all duration-300"
            >
              Explore Services
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </section>

      {/* STATS */}
      <section className="bg-charcoal-900 py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="font-serif text-4xl font-light text-gold-400 mb-1">{s.value}</p>
              <p className="text-xs tracking-widest uppercase text-beige-300/60">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* INTRO */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp}>
            <p className="section-subtitle">Our Philosophy</p>
            <h2 className="section-title mb-6">
              Luxury Is Not a Luxury —<br /> It's a Necessity.
            </h2>
            <div className="divider-gold-left" />
            <p className="text-charcoal-700/70 leading-relaxed mb-5">
              At Serenity, we believe that exceptional self-care is fundamental to living well. Our
              curated services blend ancient wellness traditions with modern luxury to create
              experiences that go far beyond the ordinary.
            </p>
            <p className="text-charcoal-700/70 leading-relaxed mb-8">
              Every treatment is performed by skilled professionals in an environment meticulously
              designed to soothe your senses from the moment you walk in.
            </p>
            <Link to="/about" className="btn-outline">
              Our Story
            </Link>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="relative h-[460px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80"
                alt="Luxury spa"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-gold-300/30 -z-10" />
            <div className="absolute -top-6 -right-6 w-32 h-32 border-2 border-gold-400/40 -z-10" />
          </motion.div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 bg-beige-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="section-subtitle">Why Serenity</p>
            <h2 className="section-title">Crafted for Discerning Guests</h2>
            <div className="divider-gold" />
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-8 text-center card-shadow"
              >
                <div className="w-14 h-14 border border-gold-400 flex items-center justify-center mx-auto mb-5">
                  <v.icon className="text-gold-500" size={22} />
                </div>
                <h3 className="font-serif text-xl text-charcoal-800 mb-3">{v.title}</h3>
                <p className="text-sm text-charcoal-700/65 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <p className="section-subtitle">What We Offer</p>
              <h2 className="section-title">Premium Services</h2>
              <div className="divider-gold-left" />
            </div>
            <Link to="/services" className="flex items-center gap-2 text-sm text-gold-500 tracking-widest uppercase font-sans hover:text-gold-600 transition-colors">
              View All Services <FiArrowRight />
            </Link>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.slice(0, 4).map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES PREVIEW */}
      <section className="py-24 bg-charcoal-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="text-xs tracking-widest uppercase text-gold-400 mb-3">Curated Bundles</p>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-white">Our Wellness Packages</h2>
            <div className="divider-gold" />
            <p className="text-beige-300/60 max-w-xl mx-auto text-sm leading-relaxed">
              Thoughtfully assembled packages that combine our finest services for an all-encompassing experience.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {packages.map((pkg, i) => (
              <PackageCard key={pkg.id} pkg={pkg} index={i} />
            ))}
          </div>
          <motion.div
            {...fadeUp}
            className="text-center mt-12"
          >
            <Link to="/packages" className="btn-outline border-gold-400 text-gold-400 hover:bg-gold-500 hover:text-white hover:border-gold-500">
              View All Packages
            </Link>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-beige-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="section-subtitle">Client Stories</p>
            <h2 className="section-title">Words From Our Guests</h2>
            <div className="divider-gold" />
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-8 card-shadow relative"
              >
                <span className="text-6xl font-serif text-gold-300 absolute top-4 left-6 leading-none">"</span>
                <p className="text-charcoal-700/75 text-sm leading-relaxed pt-6 mb-6 italic">
                  {t.quote}
                </p>
                <div className="flex items-center gap-3 border-t border-beige-100 pt-5">
                  <div>
                    <p className="font-sans font-semibold text-sm text-charcoal-800">{t.name}</p>
                    <p className="text-xs text-gold-500">{t.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section
        className="relative py-28 overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1678988227223-45112511eca2?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-charcoal-900/75" />
        <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
          <motion.p {...fadeUp} className="text-xs tracking-widest uppercase text-gold-400 mb-4">
            Your Wellness Awaits
          </motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-light text-white mb-6"
          >
            Ready to Experience Serenity?
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-beige-300/70 mb-10"
          >
            Book your appointment today and step into a world of calm, care, and rejuvenation.
          </motion.p>
          <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.3 }}>
            <Link to="/book" className="btn-primary px-12 py-4">
              Reserve Your Spot
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
