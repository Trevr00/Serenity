import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiAward, FiHeart, FiStar } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import ServiceCard from '../components/ServiceCard'
import PackageCard from '../components/PackageCard'
import { services as staticServices } from '../data/services'
import { packages as staticPackages } from '../data/packages'
import { useSiteSettings } from '../context/SiteSettingsContext'
import api from '../api'

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

// Map API package (features/isPopular) to what PackageCard expects (includes/popular)
const adaptPackage = (pkg, i) => ({
  id: pkg._id,
  name: pkg.name,
  tagline: pkg.tagline || '',
  price: pkg.price,
  duration: pkg.duration || '',
  popular: pkg.isPopular || false,
  color: ['bronze', 'silver', 'gold'][i % 3],
  includes: pkg.features || [],
})

export default function Home() {
  const { get } = useSiteSettings()
  const [livePackages, setLivePackages] = useState(null)

  // Merge static service data with any admin overrides from settings
  const services = staticServices.map((svc) => ({
    ...svc,
    image: get(`service.${svc.slug}.image`) || svc.image,
    title: get(`service.${svc.slug}.title`) || svc.title,
    description: get(`service.${svc.slug}.description`) || svc.description,
  }))

  useEffect(() => {
    api.get('/packages')
      .then(({ data }) => { if (data.packages?.length) setLivePackages(data.packages) })
      .catch(() => {})
  }, [])

  const packages = livePackages
    ? livePackages.map(adaptPackage)
    : staticPackages

  const heroBg = get('site.hero_bg_image') || 'https://images.unsplash.com/photo-1743286159555-ea765c1bc5e6?w=1600&q=80'
  const heroTitle = get('site.hero_title') || 'Where Calm Becomes\nYour Standard'
  const heroSubtitle = get('site.hero_subtitle') || 'Discover a sanctuary of premium grooming, therapeutic massage, and rejuvenating spa rituals — crafted for those who value excellence.'

  return (
    <div>
      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Layered gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/65 via-charcoal-900/40 to-charcoal-900/80" />
        {/* Soft rose radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(222,109,147,0.18)_0%,transparent_65%)]" />

        {/* Floating atmospheric blobs */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-gold-400/15 blur-[100px] -top-40 -left-40 animate-float pointer-events-none" />
        <div className="absolute w-[380px] h-[380px] rounded-full bg-beige-300/12 blur-[90px] -bottom-20 -right-20 animate-float-slow pointer-events-none" />
        <div className="absolute w-[280px] h-[280px] rounded-full bg-sage-300/10 blur-[70px] top-1/3 right-1/4 animate-float pointer-events-none" />

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
            {heroTitle.split('\n').map((line, i, arr) => (
              i === arr.length - 1
                ? <em key={i} style={{ color: 'var(--primary)' }}>{line}</em>
                : <span key={i}>{line}<br /></span>
            ))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-beige-200/80 text-lg max-w-xl mx-auto mb-8 leading-relaxed font-light"
          >
            {heroSubtitle}
          </motion.p>

          {/* Ornamental separator */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="flex items-center justify-center gap-4 mb-10"
          >
            <div className="w-14 h-px bg-gradient-to-r from-transparent to-gold-400/70" />
            <span className="text-gold-400/80 text-base">✦</span>
            <div className="w-14 h-px bg-gradient-to-l from-transparent to-gold-400/70" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/book"
              className="btn-glow px-10 py-4"
            >
              Book Your Experience
            </Link>
            <Link
              to="/services"
              className="px-10 py-4 border border-white/40 text-white text-xs tracking-widest uppercase font-sans font-medium hover:border-white hover:bg-white/10 transition-all duration-300 rounded-full"
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
      <section className="py-14" style={{ background: 'linear-gradient(135deg, #1e0a1a 0%, #3e2438 55%, #1e0a1a 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative text-center"
            >
              {/* Glow behind number */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-20 h-20 rounded-full bg-gold-500/10 blur-2xl animate-glow-pulse" />
              </div>
              <p className="relative font-serif text-4xl font-light text-gold-400 mb-1">{s.value}</p>
              <p className="relative text-xs tracking-widest uppercase text-beige-300/60">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* INTRO / PHILOSOPHY */}
      <section className="py-24" style={{ background: 'linear-gradient(135deg, #fdf7fa 0%, #fae8ff 50%, #fdf7fa 100%)' }}>
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
            <div className="relative h-[460px] overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(222,109,147,0.22)]">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80"
                alt="Luxury spa"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative floating blobs behind image */}
            <div className="absolute -bottom-8 -left-8 w-52 h-52 rounded-full bg-gold-300/25 blur-3xl -z-10 animate-float" />
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-sage-300/20 blur-2xl -z-10 animate-float-slow" />
          </motion.div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #fae8ff 0%, #fff1f5 50%, #fae8ff 100%)' }}>
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
                className="glass-card p-8 text-center"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{
                    background: 'linear-gradient(135deg, rgba(222,109,147,0.14) 0%, rgba(165,145,219,0.14) 100%)',
                    border: '1px solid rgba(222,109,147,0.35)',
                  }}
                >
                  <v.icon className="text-gold-500" size={24} />
                </div>
                <h3 className="font-serif text-xl text-charcoal-800 mb-3">{v.title}</h3>
                <p className="text-sm text-charcoal-700/65 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="relative py-24 bg-cream overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute w-96 h-96 rounded-full bg-gold-300/12 blur-[100px] -top-20 -right-20 pointer-events-none animate-float-slow" />
        <div className="absolute w-72 h-72 rounded-full bg-petal-200/15 blur-[80px] bottom-10 -left-10 pointer-events-none animate-float" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
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
      <section className="py-24" style={{ background: 'linear-gradient(135deg, #fff1f5 0%, #fae8ff 50%, #fff1f5 100%)' }}>
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
                className="glass-card p-8 relative"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-gold-400 text-sm">★</span>
                  ))}
                </div>

                <span className="text-6xl font-serif text-gold-300/70 absolute top-4 left-6 leading-none">"</span>
                <p className="text-charcoal-700/75 text-sm leading-relaxed pt-5 mb-6 italic">
                  {t.quote}
                </p>
                <div className="flex items-center gap-3 border-t border-gold-300/25 pt-5">
                  {/* Initial avatar */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium font-serif shrink-0"
                    style={{ background: 'linear-gradient(135deg, #de6d93 0%, #a591db 100%)' }}
                  >
                    {t.name.charAt(0)}
                  </div>
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
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900/80 via-charcoal-900/65 to-charcoal-900/80" />
        {/* Warm rose radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(222,109,147,0.22)_0%,transparent_65%)]" />
        {/* Floating glow blob */}
        <div className="absolute w-96 h-96 rounded-full bg-gold-400/12 blur-[90px] top-0 left-1/2 -translate-x-1/2 animate-float pointer-events-none" />

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
            <Link to="/book" className="btn-glow px-12 py-4">
              Reserve Your Spot
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
