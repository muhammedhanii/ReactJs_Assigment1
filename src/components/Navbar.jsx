import { NavLink } from 'react-router-dom'

/**
 * Navigation bar.
 *
 * NavLink is used instead of Link because it knows whether its route is the
 * active one — the `isActive` flag is used to highlight the current page.
 */
function Navbar() {
  const links = [
    { to: '/', label: 'Home', end: true },
    { to: '/about', label: 'About' },
    { to: '/join', label: 'Join the club' },
  ]

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <NavLink to="/" className="navbar__brand">
          CINEMA<span>.</span>CLUB
        </NavLink>

        <nav className="navbar__links" aria-label="Main navigation">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
