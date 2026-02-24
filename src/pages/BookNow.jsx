import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiCheckCircle, FiCalendar, FiUser, FiPhone, FiMail, FiMessageSquare } from 'react-icons/fi'
import PageHero from '../components/PageHero'
import { services } from '../data/services'

const timeSlots = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
  '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM',
]

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  service: '',
  date: '',
  time: '',
  notes: '',
  referralCode: '',
}

export default function BookNow() {
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const errs = {}
    if (!form.firstName) errs.firstName = 'First name is required'
    if (!form.lastName) errs.lastName = 'Last name is required'
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email is required'
    if (!form.phone) errs.phone = 'Phone number is required'
    if (!form.service) errs.service = 'Please select a service'
    if (!form.date) errs.date = 'Please select a date'
    if (!form.time) errs.time = 'Please select a time slot'
    return errs
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setSubmitted(true)
  }

  const today = new Date().toISOString().split('T')[0]

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-cream flex items-center justify-center px-6 pt-24"
      >
        <div className="max-w-md text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <FiCheckCircle className="text-sage-600" size={40} />
          </motion.div>
          <h2 className="font-serif text-3xl text-charcoal-800 mb-3">Booking Confirmed!</h2>
          <p className="text-charcoal-700/65 leading-relaxed mb-2">
            Thank you, <strong>{form.firstName}</strong>. Your booking request has been received.
          </p>
          <p className="text-charcoal-700/65 leading-relaxed mb-8">
            We'll send a confirmation to <strong>{form.email}</strong> shortly. See you soon!
          </p>
          <button
            onClick={() => { setForm(initialForm); setSubmitted(false) }}
            className="btn-outline"
          >
            Book Another Appointment
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <PageHero
        title="Book Your Experience"
        subtitle="Reserve Your Spot"
        image="https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1400&q=80"
      />

      <section className="py-20 bg-cream">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="section-subtitle">Appointments</p>
              <h2 className="section-title mb-2">Make a Reservation</h2>
              <div className="divider-gold-left" />
              <p className="text-charcoal-700/65 text-sm mb-8 leading-relaxed">
                Fill in your details below and we'll confirm your appointment within 2 hours during business hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Name row */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-charcoal-700/60 mb-1.5">
                      First Name *
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-700/30" size={15} />
                      <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="Amara"
                        className={`w-full pl-9 pr-4 py-3 border text-sm bg-white outline-none focus:border-gold-400 transition-colors ${
                          errors.firstName ? 'border-red-400' : 'border-beige-200'
                        }`}
                      />
                    </div>
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-charcoal-700/60 mb-1.5">
                      Last Name *
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-700/30" size={15} />
                      <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Okonkwo"
                        className={`w-full pl-9 pr-4 py-3 border text-sm bg-white outline-none focus:border-gold-400 transition-colors ${
                          errors.lastName ? 'border-red-400' : 'border-beige-200'
                        }`}
                      />
                    </div>
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-charcoal-700/60 mb-1.5">
                      Email *
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-700/30" size={15} />
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="amara@email.com"
                        className={`w-full pl-9 pr-4 py-3 border text-sm bg-white outline-none focus:border-gold-400 transition-colors ${
                          errors.email ? 'border-red-400' : 'border-beige-200'
                        }`}
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-charcoal-700/60 mb-1.5">
                      Phone *
                    </label>
                    <div className="relative">
                      <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-700/30" size={15} />
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+234 800 000 0000"
                        className={`w-full pl-9 pr-4 py-3 border text-sm bg-white outline-none focus:border-gold-400 transition-colors ${
                          errors.phone ? 'border-red-400' : 'border-beige-200'
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Service */}
                <div>
                  <label className="block text-xs tracking-widest uppercase text-charcoal-700/60 mb-1.5">
                    Service *
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border text-sm bg-white outline-none focus:border-gold-400 transition-colors ${
                      errors.service ? 'border-red-400' : 'border-beige-200'
                    }`}
                  >
                    <option value="">Select a service...</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title} — from KSh {s.priceFrom.toLocaleString()}
                      </option>
                    ))}
                  </select>
                  {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
                </div>

                {/* Date & Time */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-charcoal-700/60 mb-1.5">
                      Preferred Date *
                    </label>
                    <div className="relative">
                      <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-700/30" size={15} />
                      <input
                        type="date"
                        name="date"
                        value={form.date}
                        min={today}
                        onChange={handleChange}
                        className={`w-full pl-9 pr-4 py-3 border text-sm bg-white outline-none focus:border-gold-400 transition-colors ${
                          errors.date ? 'border-red-400' : 'border-beige-200'
                        }`}
                      />
                    </div>
                    {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-charcoal-700/60 mb-1.5">
                      Time Slot *
                    </label>
                    <select
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border text-sm bg-white outline-none focus:border-gold-400 transition-colors ${
                        errors.time ? 'border-red-400' : 'border-beige-200'
                      }`}
                    >
                      <option value="">Select a time...</option>
                      {timeSlots.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
                  </div>
                </div>

                {/* Referral Code */}
                <div>
                  <label className="block text-xs tracking-widest uppercase text-charcoal-700/60 mb-1.5">
                    Referral Code (optional)
                  </label>
                  <input
                    type="text"
                    name="referralCode"
                    value={form.referralCode}
                    onChange={handleChange}
                    placeholder="e.g. SER-12345"
                    className="w-full px-4 py-3 border border-beige-200 text-sm bg-white outline-none focus:border-gold-400 transition-colors"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs tracking-widest uppercase text-charcoal-700/60 mb-1.5">
                    Special Requests
                  </label>
                  <div className="relative">
                    <FiMessageSquare className="absolute left-3 top-3.5 text-charcoal-700/30" size={15} />
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Any allergies, preferences, or special requests..."
                      className="w-full pl-9 pr-4 py-3 border border-beige-200 text-sm bg-white outline-none focus:border-gold-400 transition-colors resize-none"
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full py-4 mt-2">
                  Confirm Booking
                </button>
              </form>
            </motion.div>
          </div>

          {/* Sidebar info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-28 space-y-6"
            >
              <div className="bg-beige-50 p-6 border border-beige-200">
                <h3 className="font-serif text-xl text-charcoal-800 mb-4">Good to Know</h3>
                <ul className="space-y-3 text-sm text-charcoal-700/70">
                  <li>• Arrive 10–15 minutes before your appointment</li>
                  <li>• Free cancellation up to 24 hours in advance</li>
                  <li>• Confirmation sent to your email within 2 hours</li>
                  <li>• Payment on arrival — cash or card accepted</li>
                  <li>• Referral credits applied automatically at checkout</li>
                </ul>
              </div>

              <div className="bg-charcoal-900 p-6 text-white">
                <h3 className="font-serif text-xl mb-3">Opening Hours</h3>
                <div className="space-y-2 text-sm text-beige-300/70">
                  <div className="flex justify-between">
                    <span>Mon – Fri</span>
                    <span>7:00am – 9:00pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>8:00am – 8:00pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>9:00am – 6:00pm</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 border border-beige-200">
                <h3 className="font-serif text-xl text-charcoal-800 mb-2">Need Help?</h3>
                <p className="text-sm text-charcoal-700/65 mb-3">Prefer to book by phone? We're happy to assist.</p>
                <p className="font-medium text-gold-500 text-sm">+234 800 SERENITY</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
