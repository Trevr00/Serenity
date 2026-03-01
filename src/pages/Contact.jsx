import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMapPin, FiPhone, FiMail, FiClock, FiCheckCircle, FiUser, FiMessageSquare } from 'react-icons/fi'
import PageHero from '../components/PageHero'

const initialForm = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const errs = {}
    if (!form.name) errs.name = 'Name is required'
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email required'
    if (!form.subject) errs.subject = 'Subject is required'
    if (!form.message) errs.message = 'Message is required'
    return errs
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitted(true)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <PageHero
        title="Contact Us"
        subtitle="Get in Touch"
        image="https://images.unsplash.com/photo-1669357657874-34944fa0be68?w=1400&q=80"
      />

      {/* Contact Grid */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-subtitle">We'd Love to Hear From You</p>
            <h2 className="section-title mb-5">Let's Connect</h2>
            <div className="divider-gold-left" />
            <p className="text-charcoal-700/70 leading-relaxed mb-10">
              Whether you have a question about our services, want to book a bespoke experience, or
              simply want to say hello — our team is always happy to assist.
            </p>

            <div className="space-y-6">
              {[
                { icon: FiMapPin, label: 'Location', value: 'Balozi Road, Off Namanga road, towards Leleshwa Inn, Nairobi, Kenya' },
                { icon: FiPhone, label: 'Phone', value: '0799 898685' },
                { icon: FiMail, label: 'Email', value: 'hello@serenitywellness.com' },
                { icon: FiClock, label: 'Hours', value: 'Mon–Fri 7am–9pm | Sat–Sun 8am–8pm' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-11 h-11 border border-gold-400 flex items-center justify-center shrink-0 mt-0.5">
                    <item.icon className="text-gold-500" size={18} />
                  </div>
                  <div>
                    <p className="text-xs tracking-widest uppercase text-charcoal-700/50 mb-0.5">{item.label}</p>
                    <p className="text-sm text-charcoal-800">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-16">
                <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mb-5">
                  <FiCheckCircle className="text-sage-600" size={32} />
                </div>
                <h3 className="font-serif text-2xl text-charcoal-800 mb-2">Message Sent!</h3>
                <p className="text-charcoal-700/65 text-sm leading-relaxed mb-6 max-w-xs">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
                <button onClick={() => { setForm(initialForm); setSubmitted(false) }} className="btn-outline">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-charcoal-700/60 mb-1.5">Name *</label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-700/30" size={14} />
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className={`w-full pl-9 pr-4 py-3 border text-sm bg-white outline-none focus:border-gold-400 transition-colors ${errors.name ? 'border-red-400' : 'border-beige-200'}`}
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-charcoal-700/60 mb-1.5">Email *</label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-700/30" size={14} />
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={`w-full pl-9 pr-4 py-3 border text-sm bg-white outline-none focus:border-gold-400 transition-colors ${errors.email ? 'border-red-400' : 'border-beige-200'}`}
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase text-charcoal-700/60 mb-1.5">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className={`w-full px-4 py-3 border text-sm bg-white outline-none focus:border-gold-400 transition-colors ${errors.subject ? 'border-red-400' : 'border-beige-200'}`}
                  />
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase text-charcoal-700/60 mb-1.5">Message *</label>
                  <div className="relative">
                    <FiMessageSquare className="absolute left-3 top-3.5 text-charcoal-700/30" size={14} />
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us more..."
                      className={`w-full pl-9 pr-4 py-3 border text-sm bg-white outline-none focus:border-gold-400 transition-colors resize-none ${errors.message ? 'border-red-400' : 'border-beige-200'}`}
                    />
                  </div>
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                <button type="submit" className="btn-primary w-full py-4">
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Map */}
      <section className="h-80 lg:h-96 w-full">
        <iframe
          title="Serenity Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.473856646973!2d36.954014676031434!3d-1.4874685984985636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f9fe642055dd1%3A0x8308eb46828369e2!2sSerenity%20Wellness%20Sauna!5e0!3m2!1sen!2ske!4v1771603029328!5m2!1sen!2ske"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        />
      </section>
    </motion.div>
  )
}
