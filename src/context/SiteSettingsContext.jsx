import { createContext, useContext, useEffect, useState } from 'react'
import api from '../api'

const SiteSettingsContext = createContext({})

const DEFAULTS = {
  'site.primary_color': '#d4af6a',
  'site.hero_bg_image': 'https://images.unsplash.com/photo-1743286159555-ea765c1bc5e6?w=1600&q=80',
  'site.hero_title': 'Where Calm Becomes Your Standard',
  'site.hero_subtitle': 'Discover a sanctuary of premium grooming, therapeutic massage, and rejuvenating spa rituals — crafted for those who value excellence.',
  'site.announcement_enabled': 'false',
  'site.announcement_text': '',
  'site.announcement_color': '#1a1a1a',
}

export function SiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULTS)

  useEffect(() => {
    api.get('/settings/public')
      .then(({ data }) => {
        setSettings((prev) => ({ ...prev, ...data.settings }))
      })
      .catch(() => {}) // fail silently — defaults apply
  }, [])

  // Inject CSS primary color variable whenever it changes
  useEffect(() => {
    const color = settings['site.primary_color'] || DEFAULTS['site.primary_color']
    document.documentElement.style.setProperty('--primary', color)
  }, [settings['site.primary_color']])

  const get = (key, fallback) => settings[key] ?? DEFAULTS[key] ?? fallback ?? ''

  return (
    <SiteSettingsContext.Provider value={{ settings, get }}>
      {children}
    </SiteSettingsContext.Provider>
  )
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext)
}
