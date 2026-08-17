import { useParams, useNavigate, Link } from 'react-router-dom'
import { getFilmById } from '../data/films.js'
import NotFound from './NotFound.jsx'

/**
 * Dynamic route: /films/:filmId
 *
 * useParams() reads the :filmId part straight out of the URL.
 * useNavigate() powers the "Back" button.
 */
function FilmDetail() {
  const { filmId } = useParams()
  const navigate = useNavigate()

  const film = getFilmById(filmId)

  // Unknown id in the URL — show the same 404 page.
  if (!film) {
    return <NotFound />
  }

  const hours = Math.floor(film.runtime / 60)
  const minutes = film.runtime % 60

  return (
    <div className="container container--narrow">
      <button
        type="button"
        className="backlink"
        onClick={() => navigate(-1)}
      >
        &larr; Back
      </button>

      <article className="detail">
        <p className="eyebrow">{film.screening}</p>
        <h1 className="hero__title">{film.title}</h1>

        <dl className="detail__facts">
          <div>
            <dt>Director</dt>
            <dd>{film.director}</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd>{film.year}</dd>
          </div>
          <div>
            <dt>Runtime</dt>
            <dd>
              {hours}h {minutes}m
            </dd>
          </div>
          <div>
            <dt>Hall</dt>
            <dd>{film.hall}</dd>
          </div>
        </dl>

        <p className="detail__synopsis">{film.synopsis}</p>

        <Link to="/join" className="btn btn--primary">
          Join to reserve a seat
        </Link>
      </article>
    </div>
  )
}

export default FilmDetail
