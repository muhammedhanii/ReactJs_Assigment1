import { Link } from 'react-router-dom'
import FilmCard from '../components/FilmCard.jsx'
import { films } from '../data/films.js'

function Home() {
  return (
    <div className="container">
      <section className="hero">
        <p className="eyebrow">This week</p>
        <h1 className="hero__title">Four films. One hall.</h1>
        <p className="hero__text">
          Cinema Club runs four screenings a week in a single room with 90 seats.
          Members pick the programme; everyone else is welcome to buy a ticket at
          the door.
        </p>

        <div className="hero__actions">
          <Link to="/join" className="btn btn--primary">
            Join the club
          </Link>
          <Link to="/about" className="btn btn--ghost">
            How it works
          </Link>
        </div>
      </section>

      <section>
        <h2 className="section__title">This week&rsquo;s schedule</h2>
        <div className="film-list">
          {films.map((film) => (
            <FilmCard key={film.id} film={film} />
          ))}
        </div>
        <p className="section__note">
          Select any title to see the full details.
        </p>
      </section>
    </div>
  )
}

export default Home
