import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

/**
 * Shared shell. Note that Layout never receives the theme or the cart as
 * props — its children reach for them directly through Context / Redux.
 */
function Layout() {
  return (
    <div className="shell">
      <Navbar />
      <main className="shell__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
