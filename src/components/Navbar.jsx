import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import ThemeToggle from './ThemeToggle.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import { selectCartCount } from '../redux/slices/cartSlice'

/**
 * The navbar reads BOTH pieces of global state — a good illustration of the
 * two systems living side by side:
 *
 *   useTheme()    → CONTEXT API (theme)
 *   useSelector() → REDUX       (cart count)
 */
function Navbar() {
  // CONTEXT API
  const { isDark } = useTheme()

  // REDUX: read the total number of tickets in the cart
  const cartCount = useSelector(selectCartCount)

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <NavLink to="/" className="navbar__brand">
          CINEMA<span>.</span>BOX
        </NavLink>

        <nav className="navbar__links" aria-label="Main navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
            }
          >
            Schedule
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
            }
          >
            Cart
            {/* && operator: the badge only appears once something is in the cart */}
            {cartCount > 0 && (
              <span className="navbar__badge" aria-label={`${cartCount} tickets`}>
                {cartCount}
              </span>
            )}
          </NavLink>

          <ThemeToggle />
        </nav>
      </div>

      {/* Reading the context here too, just to show the value is shared */}
      <p className="navbar__strip">
        {isDark ? 'Dark room — projector running' : 'House lights up'}
      </p>
    </header>
  )
}

export default Navbar
