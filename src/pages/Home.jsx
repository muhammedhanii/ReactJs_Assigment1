import { useSelector } from 'react-redux'

import FilmCard from '../components/FilmCard.jsx'
import GenreFilter from '../components/GenreFilter.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import { selectVisibleFilms, selectActiveGenre } from '../redux/slices/filmsSlice'
import { selectLastAction } from '../redux/slices/cartSlice'

function Home() {
  // CONTEXT API — the theme, with no props involved
  const { isDark } = useTheme()

  // REDUX — the film list and the last cart action
  const films = useSelector(selectVisibleFilms)
  const activeGenre = useSelector(selectActiveGenre)
  const lastAction = useSelector(selectLastAction)

  return (
    <div className="container">
      <section className="hero">
        <p className="eyebrow">This week</p>
        <h1 className="hero__title">Box office</h1>
        <p className="hero__text">
          Six screenings across three halls. Tickets are held for 20 minutes
          once you add them.{' '}
          {/* the copy itself reacts to the context value */}
          {isDark
            ? 'You are browsing in dark mode — easier on the eyes before a late show.'
            : 'You are browsing in light mode.'}
        </p>
      </section>

      <GenreFilter />

      {/* && operator: the toast only shows after a cart action */}
      {lastAction && (
        <p className="toast" role="status">
          {lastAction}
        </p>
      )}

      <div className="film-list">
        {films.map((film) => (
          <FilmCard key={film.id} film={film} />
        ))}
      </div>

      {/* Ternary: message when a filter matches nothing */}
      {films.length === 0 && (
        <p className="empty">Nothing scheduled under &ldquo;{activeGenre}&rdquo; this week.</p>
      )}
    </div>
  )
}

export default Home
