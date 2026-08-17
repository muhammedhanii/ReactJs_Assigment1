import { useSelector, useDispatch } from 'react-redux'
import {
  selectGenres,
  selectActiveGenre,
  setActiveGenre,
} from '../redux/slices/filmsSlice'

/**
 * Reads and writes the SECOND Redux slice (films).
 */
function GenreFilter() {
  const genres = useSelector(selectGenres)
  const activeGenre = useSelector(selectActiveGenre)
  const dispatch = useDispatch()

  return (
    <nav className="genres" aria-label="Filter by genre">
      {genres.map((genre) => (
        <button
          key={genre}
          type="button"
          className={`genres__btn ${
            activeGenre === genre ? 'genres__btn--active' : ''
          }`}
          aria-pressed={activeGenre === genre}
          onClick={() => dispatch(setActiveGenre(genre))}
        >
          {genre}
        </button>
      ))}
    </nav>
  )
}

export default GenreFilter
