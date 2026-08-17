import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Small helper component: scrolls back to the top whenever the route changes,
 * which is what a real page navigation would do.
 *
 * Renders nothing — it exists only for the side effect.
 */
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default ScrollToTop
