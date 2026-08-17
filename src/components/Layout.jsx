import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import ScrollToTop from './ScrollToTop.jsx'

/**
 * Shared shell for every page.
 *
 * <Outlet /> is where React Router injects whichever page matches the URL.
 */
function Layout() {
  return (
    <div className="shell">
      <ScrollToTop />
      <Navbar />

      <main className="shell__main">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default Layout
