import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext.jsx'

function NotFound() {
  const { pathname } = useLocation()
  const { theme } = useTheme() // CONTEXT works here too

  return (
    <div className="container container--narrow">
      <section className="panel">
        <p className="notfound__code">404</p>
        <h1 className="hero__title">No screening at this address.</h1>
        <p className="hero__text">
          Nothing is playing at <code className="path">{pathname}</code>.
          (Current theme: {theme}.)
        </p>
        <Link to="/" className="btn btn--primary">
          Back to the schedule
        </Link>
      </section>
    </div>
  )
}

export default NotFound
