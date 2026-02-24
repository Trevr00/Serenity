import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'

const team = [
  {
    name: 'Amara Eze',
    role: 'Founder & Wellness Director',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80',
    bio: 'With 15 years in luxury wellness and spa management across London and Lagos, Amara founded Serenity to bring world-class relaxation to Nigeria.',
  },
  {
    name: 'Kayode Akins',
    role: 'Head Barber & Grooming Specialist',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    bio: 'Trained in London and Dubai, Kayode is a master of precision cuts, hot-towel shaves, and classic barbering techniques.',
  },
  {
    name: 'Nkechi Obi',
    role: 'Senior Massage Therapist',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    bio: 'A certified therapist in Swedish, deep tissue, and aromatherapy massage with a passion for holistic healing.',
  },
  {
    name: 'Bayo Omotunde',
    role: 'Hair & Beauty Specialist',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    bio: 'An award-winning stylist who brings creativity, precision, and a deep understanding of African hair textures to every appointment.',
  },
]

const milestones = [
  { year: '2018', event: 'Serenity opens its doors in Victoria Island, Lagos' },
  { year: '2019', event: 'Awarded Best New Wellness Brand by Luxury Africa Magazine' },
  { year: '2020', event: 'Expanded services to include Mini-Gym & Fitness Studio' },
  { year: '2021', event: 'Launched the Serenity Referral & Loyalty Program' },
  { year: '2022', event: 'Reached 3,000 active members milestone' },
  { year: '2024', event: 'Opened the premium Sauna & Steam Suite wing' },
]

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
}

export default function About() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <PageHero
        title="About Serenity"
        subtitle="Our Story"
        image="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1400&q=80"
      />

      {/* Mission */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp}>
            <p className="section-subtitle">Our Mission</p>
            <h2 className="section-title mb-6">Born From a Belief in Better Living</h2>
            <div className="divider-gold-left" />
            <p className="text-charcoal-700/70 leading-relaxed mb-5">
              Serenity was founded on a simple conviction: that everyone deserves a space where they
              can pause, breathe, and be restored. We created a sanctuary where luxury meets
              wellness — not as an occasional indulgence, but as a way of life.
            </p>
            <p className="text-charcoal-700/70 leading-relaxed">
              From the moment you walk through our doors, every detail — the scent of essential
              oils, the warmth of the lighting, the expertise of our staff — is designed to make
              you feel that you are exactly where you need to be.
            </p>
          </motion.div>

          <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="relative">
            <img
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80"
              alt="Serenity interior"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-gold-400/40 -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-beige-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="section-subtitle">Our Journey</p>
            <h2 className="section-title">Milestones That Define Us</h2>
            <div className="divider-gold" />
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-gold-400/30" />
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className={`relative flex items-center gap-8 mb-10 ${
                  i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className={`w-1/2 ${i % 2 === 0 ? 'text-right pr-8' : 'pl-8'}`}>
                  <p className="text-xs tracking-widest uppercase text-gold-500 mb-1">{m.year}</p>
                  <p className="text-charcoal-700/75 text-sm leading-relaxed">{m.event}</p>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-gold-400 rounded-full border-4 border-cream" />
                <div className="w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="section-subtitle">The Experts</p>
            <h2 className="section-title">Meet Our Team</h2>
            <div className="divider-gold" />
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group text-center"
              >
                <div className="relative overflow-hidden mb-5 aspect-[3/4]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/20 transition-colors duration-500" />
                </div>
                <h3 className="font-serif text-xl text-charcoal-800 mb-1">{member.name}</h3>
                <p className="text-xs tracking-widest uppercase text-gold-500 mb-3">{member.role}</p>
                <p className="text-xs text-charcoal-700/60 leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-charcoal-900 text-center">
        <motion.div {...fadeUp} className="max-w-xl mx-auto px-6">
          <p className="text-xs tracking-widest uppercase text-gold-400 mb-4">Come Visit Us</p>
          <h2 className="text-3xl md:text-4xl font-serif font-light text-white mb-6">
            Experience the Serenity Difference
          </h2>
          <Link to="/book" className="btn-primary">
            Book Your Visit
          </Link>
        </motion.div>
      </section>
    </motion.div>
  )
}
