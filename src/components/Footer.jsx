import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__note">
          Cinema Club — four screenings a week, one hall, no phones.
        </p>
        <Link to="/join" className="footer__link">
          Become a member
        </Link>
      </div>
    </footer>
  )
}

export default Footer
