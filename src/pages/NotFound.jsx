import { Link, useLocation, useNavigate } from 'react-router-dom'

/**
 * 404 page.
 *
 * Reached through the catch-all route <Route path="*" /> in App.jsx,
 * so any unknown URL lands here.
 */
function NotFound() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className="container container--narrow">
      <section className="notfound">
        <p className="notfound__code">404</p>
        <h1 className="hero__title">No screening at this address.</h1>

        <p className="hero__text">
          Nothing is playing at <code className="notfound__path">{location.pathname}</code>.
          It may have been an old link, or a typo in the URL.
        </p>

        <div className="hero__actions">
          <Link to="/" className="btn btn--primary">
            Back to the schedule
          </Link>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => navigate(-1)}
          >
            Go back
          </button>
        </div>
      </section>
    </div>
  )
}

export default NotFound
