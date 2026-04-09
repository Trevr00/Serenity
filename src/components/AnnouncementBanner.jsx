import { useState } from 'react'
import { MdClose } from 'react-icons/md'
import { useSiteSettings } from '../context/SiteSettingsContext'

export default function AnnouncementBanner() {
  const { get } = useSiteSettings()
  const [dismissed, setDismissed] = useState(false)

  const enabled = get('site.announcement_enabled') === 'true'
  const text = get('site.announcement_text')
  const bgColor = get('site.announcement_color') || '#1a1a1a'

  if (!enabled || !text || dismissed) return null

  return (
    <div
      className="relative z-[60] flex items-center justify-center px-10 py-2.5 text-white text-xs tracking-wider text-center"
      style={{ backgroundColor: bgColor }}
    >
      <span>{text}</span>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Dismiss"
      >
        <MdClose className="w-4 h-4" />
      </button>
    </div>
  )
}
