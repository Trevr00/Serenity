import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MdCheck, MdAdd, MdDelete, MdDownload, MdUpload, MdPalette,
  MdSave, MdVisibility, MdClose, MdImage, MdCampaign,
} from 'react-icons/md'
import api from '../../api'
import { useTheme, applyThemeColors } from '../../context/ThemeContext'

// ── Helpers ───────────────────────────────────────────────────────────────────
const shift = (hex, amount) => {
  const clean = hex.replace('#', '')
  const clamp = (v) => Math.max(0, Math.min(255, v))
  const r = clamp(parseInt(clean.slice(0, 2), 16) + amount)
  const g = clamp(parseInt(clean.slice(2, 4), 16) + amount)
  const b = clamp(parseInt(clean.slice(4, 6), 16) + amount)
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

// ── Mini live preview mock ─────────────────────────────────────────────────────
function ThemePreview({ colors }) {
  const c = colors
  return (
    <div className="rounded-xl overflow-hidden border border-white/10 w-full" style={{ backgroundColor: c.background }}>
      {/* Navbar mock */}
      <div className="flex items-center px-3 py-2 gap-2" style={{ backgroundColor: c.text }}>
        <span className="font-serif text-xs font-light tracking-widest" style={{ color: c.background }}>SERENITY</span>
        <div className="flex-1 flex justify-end gap-1.5">
          {[28, 22, 26].map((w, i) => (
            <div key={i} className="h-1.5 rounded-full opacity-50" style={{ width: w, backgroundColor: c.background }} />
          ))}
          <div className="h-5 w-12 rounded-full" style={{ backgroundColor: c.primary }} />
        </div>
      </div>

      {/* Hero mock */}
      <div
        className="h-24 flex flex-col items-center justify-center gap-1.5 px-4"
        style={{ background: `linear-gradient(135deg, ${c.text}ee 0%, ${c.primary}66 100%)` }}
      >
        <div className="text-xs tracking-widest uppercase font-sans opacity-60" style={{ color: c.accent }}>
          Premium Wellness
        </div>
        <div className="font-serif text-sm text-center leading-tight" style={{ color: '#ffffff' }}>
          Where Calm Becomes
          <br />
          <em style={{ color: c.primary === '#ffffff' ? c.accent : c.primary }}>Your Standard</em>
        </div>
        <div className="flex gap-2 mt-1">
          <div className="h-5 w-20 rounded-full" style={{ backgroundColor: c.primary }} />
          <div className="h-5 w-20 rounded-full border" style={{ borderColor: 'rgba(255,255,255,0.5)' }} />
        </div>
      </div>

      {/* Service cards mock */}
      <div className="grid grid-cols-3 gap-2 p-2.5" style={{ backgroundColor: c.background }}>
        {['Massage', 'Sauna', 'Spa'].map((label) => (
          <div key={label} className="rounded-lg overflow-hidden" style={{ border: `1px solid ${c.accent}` }}>
            <div className="h-10" style={{ backgroundColor: c.accent }} />
            <div className="p-1.5">
              <div className="text-xs font-medium mb-1" style={{ color: c.primary }}>●</div>
              <div className="text-xs leading-none mb-1 font-sans" style={{ color: c.text }}>{label}</div>
              <div className="h-1 rounded-full" style={{ backgroundColor: c.accent, width: '70%' }} />
            </div>
          </div>
        ))}
      </div>

      {/* Package cards mock */}
      <div className="grid grid-cols-3 gap-2 px-2.5 pb-2.5" style={{ backgroundColor: c.background }}>
        {[false, true, false].map((popular, i) => (
          <div
            key={i}
            className="rounded-lg p-2"
            style={{
              border: `${popular ? 2 : 1}px solid ${popular ? c.primary : c.accent}`,
              backgroundColor: popular ? `${c.primary}11` : 'transparent',
            }}
          >
            <div className="text-xs font-serif mb-1" style={{ color: c.primary }}>
              {['Refresh', 'Restore', 'Renew'][i]}
            </div>
            <div className="text-xs font-semibold mb-1.5" style={{ color: c.text }}>KSh 3,500</div>
            <div className="h-5 rounded-full text-center text-white" style={{
              backgroundColor: popular ? c.primary : 'transparent',
              border: popular ? 'none' : `1px solid ${c.primary}`,
              fontSize: 8,
              lineHeight: '20px',
              color: popular ? '#fff' : c.primary,
            }}>
              Book Now
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Palette swatch card ────────────────────────────────────────────────────────
function ThemeCard({ theme, isActive, isPreviewing, onHover, onLeave, onApply, onDelete }) {
  const { colors } = theme
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative rounded-xl border-2 overflow-hidden cursor-pointer transition-all duration-200 ${
        isActive ? 'border-amber-400 shadow-lg shadow-amber-400/20' : 'border-white/10 hover:border-white/30'
      }`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Color swatches */}
      <div className="flex h-12">
        {[colors.primary, colors.secondary, colors.background, colors.accent, colors.text].map((c, i) => (
          <div key={i} className="flex-1" style={{ backgroundColor: c }} />
        ))}
      </div>

      {/* Info */}
      <div className="bg-gray-900 px-3 py-2.5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-200 text-xs font-medium">{theme.name}</p>
            <p className="text-gray-600 text-xs mt-0.5">
              {theme.isCustom ? 'Custom' : 'Built-in'}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            {isActive && (
              <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs border border-amber-500/30">
                <MdCheck className="w-3 h-3" /> Live
              </span>
            )}
            {theme.isCustom && !isActive && (
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(theme._id) }}
                className="p-1 text-gray-600 hover:text-red-400 transition-colors"
                title="Delete"
              >
                <MdDelete className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <button
          onClick={() => onApply(theme._id)}
          disabled={isActive}
          className={`w-full mt-2 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            isActive
              ? 'bg-amber-500/20 text-amber-400 cursor-default'
              : 'bg-amber-500 hover:bg-amber-400 text-gray-900'
          }`}
        >
          {isActive ? 'Active' : 'Apply Theme'}
        </button>
      </div>
    </motion.div>
  )
}

// ── Color input row ────────────────────────────────────────────────────────────
function ColorRow({ label, name, value, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <label className="text-gray-400 text-xs w-24 flex-shrink-0">{label}</label>
      <div className="flex items-center gap-2 flex-1">
        <input
          type="color"
          value={value || '#000000'}
          onChange={(e) => onChange(name, e.target.value)}
          className="w-9 h-9 rounded-lg cursor-pointer bg-transparent border border-white/10 flex-shrink-0"
        />
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(name, e.target.value)}
          maxLength={7}
          className="flex-1 bg-gray-800 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-gray-200 font-mono focus:outline-none focus:border-amber-500/50"
        />
        <div className="w-6 h-6 rounded-md border border-white/10 flex-shrink-0" style={{ backgroundColor: value }} />
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
const TABS = [
  { id: 'themes', label: 'Themes', icon: MdPalette },
  { id: 'hero', label: 'Hero', icon: MdImage },
  { id: 'announcement', label: 'Banner', icon: MdCampaign },
]

const EMPTY_COLORS = { primary: '#de6d93', secondary: '#a591db', background: '#fdf7fa', accent: '#f7c5d4', text: '#2e1629' }

export default function AdminAppearance() {
  const { activeTheme, previewTheme, resetPreview, applyTheme, reload } = useTheme()
  const [themes, setThemes] = useState([])
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState(null)
  const [hoveredId, setHoveredId] = useState(null)
  const [tab, setTab] = useState('themes')

  // Custom builder
  const [builderOpen, setBuilderOpen] = useState(false)
  const [customName, setCustomName] = useState('')
  const [customColors, setCustomColors] = useState(EMPTY_COLORS)
  const [savingCustom, setSavingCustom] = useState(false)

  // Hero & Announcement settings (reuse existing SystemSetting approach)
  const [heroBg, setHeroBg] = useState('')
  const [heroTitle, setHeroTitle] = useState('')
  const [heroSubtitle, setHeroSubtitle] = useState('')
  const [annEnabled, setAnnEnabled] = useState(false)
  const [annText, setAnnText] = useState('')
  const [annColor, setAnnColor] = useState('#1a1a1a')
  const [settingsSaving, setSettingsSaving] = useState(false)

  useEffect(() => {
    fetchThemes()
    fetchSiteSettings()
  }, [])

  const fetchThemes = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/themes')
      setThemes(data.themes)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchSiteSettings = async () => {
    try {
      const { data } = await api.get('/admin/settings')
      const s = {}
      data.settings.forEach(x => { s[x.key] = x.value })
      setHeroBg(s['site.hero_bg_image'] || '')
      setHeroTitle(s['site.hero_title'] || '')
      setHeroSubtitle(s['site.hero_subtitle'] || '')
      setAnnEnabled(s['site.announcement_enabled'] === 'true')
      setAnnText(s['site.announcement_text'] || '')
      setAnnColor(s['site.announcement_color'] || '#1a1a1a')
    } catch {}
  }

  const saveSetting = async (key, value) => {
    await api.put(`/admin/settings/${key}`, { value, isPublic: true, category: 'general' })
  }

  const saveAllHero = async () => {
    setSettingsSaving(true)
    try {
      await Promise.all([
        saveSetting('site.hero_bg_image', heroBg),
        saveSetting('site.hero_title', heroTitle),
        saveSetting('site.hero_subtitle', heroSubtitle),
      ])
    } catch (err) {
      alert('Failed to save')
    } finally {
      setSettingsSaving(false)
    }
  }

  const saveAnnouncement = async () => {
    setSettingsSaving(true)
    try {
      await Promise.all([
        saveSetting('site.announcement_enabled', String(annEnabled)),
        saveSetting('site.announcement_text', annText),
        saveSetting('site.announcement_color', annColor),
      ])
    } catch (err) {
      alert('Failed to save')
    } finally {
      setSettingsSaving(false)
    }
  }

  const handleApply = async (themeId) => {
    setApplying(themeId)
    try {
      await applyTheme(themeId)
      await fetchThemes()
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to apply theme')
    } finally {
      setApplying(null)
    }
  }

  const handleHover = (theme) => {
    setHoveredId(theme._id)
    previewTheme(theme.colors)
  }

  const handleLeave = () => {
    setHoveredId(null)
    resetPreview()
  }

  const handleDelete = async (themeId) => {
    if (!confirm('Delete this custom theme?')) return
    try {
      await api.delete(`/themes/${themeId}`)
      setThemes(prev => prev.filter(t => t._id !== themeId))
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete')
    }
  }

  const handleColorChange = (name, value) => {
    const updated = { ...customColors, [name]: value }
    setCustomColors(updated)
    previewTheme(updated)
  }

  const handleSaveCustom = async () => {
    if (!customName.trim()) return alert('Enter a theme name')
    setSavingCustom(true)
    try {
      const { data } = await api.post('/themes', { name: customName, colors: customColors })
      setThemes(prev => [...prev, data.theme])
      setBuilderOpen(false)
      setCustomName('')
      setCustomColors(EMPTY_COLORS)
      resetPreview()
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to save custom theme')
    } finally {
      setSavingCustom(false)
    }
  }

  const exportTheme = () => {
    if (!activeTheme) return
    const blob = new Blob([JSON.stringify(activeTheme, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `${activeTheme.slug}-theme.json`
    a.click()
  }

  const importTheme = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = async (e) => {
      try {
        const file = e.target.files[0]
        const text = await file.text()
        const json = JSON.parse(text)
        if (!json.name || !json.colors) return alert('Invalid theme file')
        const { data } = await api.post('/themes', { name: json.name + ' (imported)', colors: json.colors })
        setThemes(prev => [...prev, data.theme])
      } catch {
        alert('Failed to import theme')
      }
    }
    input.click()
  }

  const previewColors = hoveredId
    ? themes.find(t => t._id === hoveredId)?.colors
    : (builderOpen ? customColors : activeTheme?.colors)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-100 text-2xl font-semibold">Appearance</h1>
          <p className="text-gray-500 text-sm mt-1">
            Hover a theme to preview · Click Apply to go live
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={importTheme} className="flex items-center gap-1.5 px-3 py-2 text-xs rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors">
            <MdUpload className="w-4 h-4" /> Import
          </button>
          <button onClick={exportTheme} className="flex items-center gap-1.5 px-3 py-2 text-xs rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors">
            <MdDownload className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-900 border border-white/10 rounded-xl p-1 w-fit">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
              tab === id
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Icon className="w-4 h-4" />{label}
          </button>
        ))}
      </div>

      {/* ── THEMES TAB ── */}
      {tab === 'themes' && (
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5">
          {/* Left: palette grid + builder */}
          <div className="space-y-5">
            {/* Active theme banner */}
            {activeTheme && (
              <div className="flex items-center gap-3 px-4 py-3 bg-amber-500/10 border border-amber-500/25 rounded-xl">
                <div className="flex gap-1.5">
                  {Object.values(activeTheme.colors).map((c, i) => (
                    <div key={i} className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <div>
                  <p className="text-amber-400 text-sm font-semibold">{activeTheme.name}</p>
                  <p className="text-gray-500 text-xs">Currently live on your website</p>
                </div>
              </div>
            )}

            {/* Palette grid */}
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {themes.map((theme) => (
                  <ThemeCard
                    key={theme._id}
                    theme={theme}
                    isActive={activeTheme?._id === theme._id}
                    isPreviewing={hoveredId === theme._id}
                    onHover={() => handleHover(theme)}
                    onLeave={handleLeave}
                    onApply={handleApply}
                    onDelete={handleDelete}
                  />
                ))}

                {/* Add custom card */}
                <motion.div
                  layout
                  onClick={() => { setBuilderOpen(true); previewTheme(customColors) }}
                  className="rounded-xl border-2 border-dashed border-white/20 hover:border-amber-500/40 cursor-pointer flex flex-col items-center justify-center gap-2 py-8 transition-colors group"
                >
                  <MdAdd className="w-7 h-7 text-gray-600 group-hover:text-amber-400 transition-colors" />
                  <p className="text-gray-500 group-hover:text-gray-300 text-xs transition-colors">Custom Theme</p>
                </motion.div>
              </div>
            )}

            {/* Custom builder panel */}
            <AnimatePresence>
              {builderOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="bg-gray-900 border border-amber-500/30 rounded-xl overflow-hidden"
                >
                  <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                    <h3 className="text-gray-200 font-semibold text-sm">Custom Theme Builder</h3>
                    <button onClick={() => { setBuilderOpen(false); resetPreview() }} className="text-gray-500 hover:text-gray-300">
                      <MdClose className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-5 space-y-4">
                    <div>
                      <label className="text-gray-400 text-xs font-medium block mb-1.5">Theme Name</label>
                      <input
                        type="text"
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        placeholder="My Custom Theme"
                        className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-amber-500/50"
                      />
                    </div>
                    <div className="space-y-3">
                      {[
                        { label: 'Primary',    name: 'primary',    hint: 'Buttons, links, accents' },
                        { label: 'Secondary',  name: 'secondary',  hint: 'Hover states, gradients' },
                        { label: 'Background', name: 'background', hint: 'Page background' },
                        { label: 'Accent',     name: 'accent',     hint: 'Cards, borders, subtle fills' },
                        { label: 'Text',       name: 'text',       hint: 'Headings, body text' },
                      ].map(({ label, name, hint }) => (
                        <div key={name}>
                          <ColorRow
                            label={label}
                            name={name}
                            value={customColors[name]}
                            onChange={handleColorChange}
                          />
                          <p className="text-gray-600 text-xs mt-1 ml-28">{hint}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => { setBuilderOpen(false); resetPreview() }}
                        className="flex-1 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 text-sm transition-colors"
                      >Cancel</button>
                      <button
                        onClick={handleSaveCustom}
                        disabled={savingCustom}
                        className="flex-1 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-gray-900 text-sm font-semibold disabled:opacity-60 transition-colors"
                      >
                        {savingCustom ? 'Saving…' : 'Save Theme'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: live preview */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <MdVisibility className="w-4 h-4" />
              <span>Live Preview</span>
              {hoveredId && <span className="text-amber-400">(hovering)</span>}
            </div>
            {previewColors ? (
              <ThemePreview colors={previewColors} />
            ) : (
              <div className="bg-gray-900 border border-white/10 rounded-xl p-8 text-center text-gray-600 text-sm">
                Hover a theme to preview
              </div>
            )}
            {/* Color legend */}
            {previewColors && (
              <div className="bg-gray-900 border border-white/10 rounded-xl p-4 space-y-2">
                {Object.entries(previewColors).map(([key, val]) => (
                  <div key={key} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded border border-white/10 flex-shrink-0" style={{ backgroundColor: val }} />
                    <span className="text-gray-500 text-xs capitalize w-24">{key}</span>
                    <span className="text-gray-400 text-xs font-mono">{val}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── HERO TAB ── */}
      {tab === 'hero' && (
        <div className="bg-gray-900 border border-white/10 rounded-xl p-6 space-y-5 max-w-2xl">
          <h2 className="text-gray-200 font-semibold">Hero Section</h2>
          <div>
            <label className="text-gray-400 text-xs font-medium block mb-1.5">Background Image URL</label>
            <input
              type="url"
              value={heroBg}
              onChange={(e) => setHeroBg(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-amber-500/50"
            />
            {heroBg && (
              <div className="mt-2 h-28 rounded-lg overflow-hidden border border-white/10">
                <img src={heroBg} alt="preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
              </div>
            )}
          </div>
          <div>
            <label className="text-gray-400 text-xs font-medium block mb-1.5">Hero Title</label>
            <input
              type="text"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              placeholder="Where Calm Becomes Your Standard"
              className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-amber-500/50"
            />
            <p className="text-gray-600 text-xs mt-1">Use a newline (\n) to split into two lines</p>
          </div>
          <div>
            <label className="text-gray-400 text-xs font-medium block mb-1.5">Hero Subtitle</label>
            <textarea
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              rows={3}
              placeholder="Discover a sanctuary…"
              className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-amber-500/50 resize-none"
            />
          </div>
          <button
            onClick={saveAllHero}
            disabled={settingsSaving}
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-gray-900 text-sm font-semibold rounded-lg disabled:opacity-60 transition-colors"
          >
            <MdSave className="w-4 h-4" />
            {settingsSaving ? 'Saving…' : 'Save Hero Settings'}
          </button>
        </div>
      )}

      {/* ── ANNOUNCEMENT TAB ── */}
      {tab === 'announcement' && (
        <div className="bg-gray-900 border border-white/10 rounded-xl p-6 space-y-5 max-w-2xl">
          <h2 className="text-gray-200 font-semibold">Announcement Banner</h2>
          <p className="text-gray-500 text-sm -mt-3">
            A dismissible top-of-page banner shown to all visitors.
          </p>
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-white/10">
            <div>
              <p className="text-gray-200 text-sm font-medium">Show Banner</p>
              <p className="text-gray-500 text-xs">Toggle visibility for all visitors</p>
            </div>
            <button
              onClick={() => setAnnEnabled(!annEnabled)}
              className={`w-11 h-6 rounded-full transition-colors relative ${annEnabled ? 'bg-amber-500' : 'bg-gray-700'}`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${annEnabled ? 'left-6' : 'left-1'}`} />
            </button>
          </div>
          <div>
            <label className="text-gray-400 text-xs font-medium block mb-1.5">Banner Text</label>
            <input
              type="text"
              value={annText}
              onChange={(e) => setAnnText(e.target.value)}
              placeholder="Grand Opening — 20% off all services this week!"
              className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-amber-500/50"
            />
          </div>
          <div>
            <label className="text-gray-400 text-xs font-medium block mb-3">Background Color</label>
            <div className="flex items-center gap-3">
              <input type="color" value={annColor} onChange={(e) => setAnnColor(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-white/10" />
              <input type="text" value={annColor} onChange={(e) => setAnnColor(e.target.value)} className="w-32 bg-gray-800 border border-white/10 rounded-lg px-2.5 py-2 text-xs text-gray-200 font-mono focus:outline-none focus:border-amber-500/50" />
            </div>
          </div>
          {annText && (
            <div>
              <p className="text-gray-500 text-xs mb-2">Preview</p>
              <div className="flex items-center justify-center px-8 py-2.5 text-white text-xs tracking-wider rounded-lg" style={{ backgroundColor: annColor }}>
                {annText}
              </div>
            </div>
          )}
          <button
            onClick={saveAnnouncement}
            disabled={settingsSaving}
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-gray-900 text-sm font-semibold rounded-lg disabled:opacity-60 transition-colors"
          >
            <MdSave className="w-4 h-4" />
            {settingsSaving ? 'Saving…' : 'Save Banner Settings'}
          </button>
        </div>
      )}
    </motion.div>
  )
}
