import { Link } from 'react-router-dom'

/**
 * One film in the Home page list.
 * The whole card links to the dynamic route /films/:filmId
 */
function FilmCard({ film }) {
  const hours = Math.floor(film.runtime / 60)
  const minutes = film.runtime % 60

  return (
    <article className="film">
      <div className="film__hall">
        <span className="film__hallName">{film.hall.replace('Hall ', '')}</span>
        <span className="film__hallLabel">hall</span>
      </div>

      <div className="film__body">
        <h3 className="film__title">
          <Link to={`/films/${film.id}`} className="film__link">
            {film.title}
          </Link>
        </h3>
        <p className="film__meta">
          {film.year} &middot; {hours}h {minutes}m &middot; {film.genre}
        </p>
        <p className="film__screening">{film.screening}</p>
      </div>
    </article>
  )
}

export default FilmCard
