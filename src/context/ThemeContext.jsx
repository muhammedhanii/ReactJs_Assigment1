import { createContext, useContext, useState, useEffect, useMemo } from 'react'

/**
 * ============================================================
 * CONTEXT API — global state piece #1: the THEME (light / dark)
 * ============================================================
 *
 * The theme is needed by the navbar, the toggle button, the pages and the
 * footer. Passing it down as props would mean threading it through every
 * level in between, so it lives in a Context instead.
 */

// 1. Create the context.
const ThemeContext = createContext(null)

const STORAGE_KEY = 'cinema-theme'

// 2. The Provider — wraps the app and holds the actual state.
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Remember the visitor's last choice.
    try {
      return window.localStorage.getItem(STORAGE_KEY) || 'dark'
    } catch {
      return 'dark'
    }
  })

  // Apply the theme to <html data-theme="..."> so the CSS variables switch.
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // ignore — the app still works without storage
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  // useMemo keeps the context value stable between renders.
  const value = useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      toggleTheme,
      setTheme,
    }),
    [theme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

/**
 * 3. Custom hook wrapping useContext.
 *
 * Components call useTheme() instead of useContext(ThemeContext) directly.
 * It also throws a clear error if it is ever used outside the Provider.
 */
export function useTheme() {
  const context = useContext(ThemeContext)

  if (context === null) {
    throw new Error('useTheme must be used inside a <ThemeProvider>')
  }

  return context
}

export default ThemeContext
