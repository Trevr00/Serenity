import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiGift, FiUsers, FiDollarSign, FiShare2 } from 'react-icons/fi'
import PageHero from '../components/PageHero'

const steps = [
  {
    icon: FiShare2,
    step: '01',
    title: 'Share Your Code',
    desc: 'Every Serenity member receives a unique referral code. Share it with friends, family, and colleagues.',
  },
  {
    icon: FiUsers,
    step: '02',
    title: 'Friend Books & Visits',
    desc: 'When your referred friend books their first appointment using your code, the magic begins.',
  },
  {
    icon: FiGift,
    step: '03',
    title: 'Both of You Win',
    desc: 'Your friend gets KSh 2,000 off their first visit, and you earn KSh 3,000 credit to use on any service.',
  },
  {
    icon: FiDollarSign,
    step: '04',
    title: 'Earn & Redeem',
    desc: 'Credits never expire. Stack them up and use them toward any service or package you love.',
  },
]

const tiers = [
  {
    name: 'Copper',
    referrals: '1–4 referrals',
    reward: 'KSh 3,000 per referral',
    perks: ['Credit on each successful referral', 'Welcome reward for referred friend'],
    color: 'border-amber-600 text-amber-600',
  },
  {
    name: 'Silver',
    referrals: '5–9 referrals',
    reward: 'KSh 4,000 per referral',
    perks: ['Increased credit per referral', '1 complimentary steam bath per quarter', 'Priority booking'],
    color: 'border-slate-400 text-slate-500',
  },
  {
    name: 'Gold',
    referrals: '10+ referrals',
    reward: 'KSh 5,000 per referral',
    perks: ['Maximum credit per referral', '1 free service per month', 'Dedicated concierge', 'Exclusive member events'],
    color: 'border-gold-500 text-gold-500',
  },
]

export default function Referral() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <PageHero
        title="Referral Program"
        subtitle="Share the Serenity"
        image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1400&q=80"
      />

      {/* Intro */}
      <section className="py-16 bg-cream">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-subtitle">Reward Your Circle</p>
            <h2 className="section-title mb-5">Give Serenity. Earn Serenity.</h2>
            <div className="divider-gold" />
            <p className="text-charcoal-700/70 leading-relaxed">
              Our referral program is our way of saying thank you for spreading the word. The more
              people you introduce to Serenity, the more you earn — and the better the rewards get.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-beige-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="section-subtitle">The Process</p>
            <h2 className="section-title">How It Works</h2>
            <div className="divider-gold" />
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="relative w-16 h-16 mx-auto mb-5">
                  <div className="w-full h-full border-2 border-gold-400 flex items-center justify-center">
                    <step.icon className="text-gold-500" size={22} />
                  </div>
                  <span className="absolute -top-3 -right-3 text-xs font-bold text-gold-400 font-sans bg-cream px-1">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-serif text-xl text-charcoal-800 mb-2">{step.title}</h3>
                <p className="text-sm text-charcoal-700/65 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reward Tiers */}
      <section className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="section-subtitle">Loyalty Tiers</p>
            <h2 className="section-title">The More You Share, The More You Earn</h2>
            <div className="divider-gold" />
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`bg-white p-8 border-2 card-shadow ${tier.color.split(' ')[0]}`}
              >
                <p className="text-xs tracking-widest uppercase text-charcoal-700/50 mb-1">{tier.referrals}</p>
                <h3 className={`font-serif text-3xl font-light mb-1 ${tier.color.split(' ')[1]}`}>
                  {tier.name}
                </h3>
                <p className={`text-lg font-serif font-light mb-4 ${tier.color.split(' ')[1]}`}>
                  {tier.reward}
                </p>
                <ul className="space-y-3">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-sm text-charcoal-700">
                      <span className="text-gold-500 mt-0.5">✓</span>
                      {perk}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-charcoal-900 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto px-6"
        >
          <p className="text-xs tracking-widest uppercase text-gold-400 mb-4">Get Started</p>
          <h2 className="text-3xl md:text-4xl font-serif font-light text-white mb-4">
            Join Serenity & Get Your Code
          </h2>
          <p className="text-beige-300/60 text-sm mb-8 leading-relaxed">
            Become a member today and receive your unique referral code instantly upon booking your first appointment.
          </p>
          <Link to="/book" className="btn-primary">
            Book Your First Visit
          </Link>
        </motion.div>
      </section>
    </motion.div>
  )
}
