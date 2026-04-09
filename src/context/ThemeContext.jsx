import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import api from '../api'

const ThemeContext = createContext({})

// Convert #de6d93 → "222 109 147" (space-separated RGB for Tailwind CSS var support)
const hexToRgb = (hex) => {
  const clean = hex.replace('#', '')
  const r = parseInt(clean.slice(0, 2), 16)
  const g = parseInt(clean.slice(2, 4), 16)
  const b = parseInt(clean.slice(4, 6), 16)
  return `${r} ${g} ${b}`
}

// Lighten/darken a hex color by an RGB offset
const shift = (hex, amount) => {
  const clean = hex.replace('#', '')
  const clamp = (v) => Math.max(0, Math.min(255, v))
  const r = clamp(parseInt(clean.slice(0, 2), 16) + amount)
  const g = clamp(parseInt(clean.slice(2, 4), 16) + amount)
  const b = clamp(parseInt(clean.slice(4, 6), 16) + amount)
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

export const applyThemeColors = (colors) => {
  const { primary, text, background } = colors
  const root = document.documentElement

  // Gold → primary color (all shades derived from primary)
  root.style.setProperty('--tw-gold-300', hexToRgb(shift(primary, +60)))
  root.style.setProperty('--tw-gold-400', hexToRgb(shift(primary, +28)))
  root.style.setProperty('--tw-gold-500', hexToRgb(primary))
  root.style.setProperty('--tw-gold-600', hexToRgb(shift(primary, -28)))

  // Charcoal → text color (shades derived)
  root.style.setProperty('--tw-charcoal-700', hexToRgb(shift(text, +16)))
  root.style.setProperty('--tw-charcoal-800', hexToRgb(text))
  root.style.setProperty('--tw-charcoal-900', hexToRgb(shift(text, -16)))

  // Cream → background
  root.style.setProperty('--tw-cream', hexToRgb(background))

  // Named semantic vars
  root.style.setProperty('--color-primary',   hexToRgb(primary))
  root.style.setProperty('--color-secondary', hexToRgb(colors.secondary || primary))
  root.style.setProperty('--color-bg',        hexToRgb(background))
  root.style.setProperty('--color-accent',    hexToRgb(colors.accent || shift(primary, +60)))
  root.style.setProperty('--color-text',      hexToRgb(text))
}

export function ThemeProvider({ children }) {
  const [activeTheme, setActiveTheme] = useState(null)
  const [previewColors, setPreviewColors] = useState(null)

  const loadActiveTheme = useCallback(async () => {
    try {
      const { data } = await api.get('/themes/active')
      if (data.theme?.colors) {
        setActiveTheme(data.theme)
        applyThemeColors(data.theme.colors)
      }
    } catch {
      // Silently fall back to CSS defaults in index.css
    }
  }, [])

  useEffect(() => { loadActiveTheme() }, [loadActiveTheme])

  // Preview a theme without saving
  const previewTheme = useCallback((colors) => {
    setPreviewColors(colors)
    applyThemeColors(colors)
  }, [])

  // Reset preview back to the saved active theme
  const resetPreview = useCallback(() => {
    setPreviewColors(null)
    if (activeTheme?.colors) applyThemeColors(activeTheme.colors)
  }, [activeTheme])

  // Apply & save a theme
  const applyTheme = useCallback(async (themeId) => {
    const { data } = await api.post('/themes/apply', { id: themeId })
    setActiveTheme(data.theme)
    setPreviewColors(null)
    applyThemeColors(data.theme.colors)
    return data.theme
  }, [])

  return (
    <ThemeContext.Provider value={{ activeTheme, previewColors, previewTheme, resetPreview, applyTheme, reload: loadActiveTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
