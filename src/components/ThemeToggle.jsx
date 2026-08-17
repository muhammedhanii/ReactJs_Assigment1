import { useTheme } from '../context/ThemeContext.jsx'

/**
 * CONTEXT API consumer #1.
 *
 * This button owns no state of its own — it reads the theme and the toggle
 * function straight out of the context.
 */
function ThemeToggle() {
  const { theme, isDark, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <span className="theme-toggle__icon" aria-hidden="true">
        {isDark ? '◐' : '◑'}
      </span>
      <span className="theme-toggle__label">{theme}</span>
    </button>
  )
}

export default ThemeToggle
