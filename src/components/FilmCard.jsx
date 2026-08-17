import { useSelector, useDispatch } from 'react-redux'
import { addTicket, selectIsInCart } from '../redux/slices/cartSlice'

/**
 * REDUX writer.
 *
 * useDispatch() sends the addTicket action to the store.
 * useSelector() checks whether this film is already in the cart.
 *
 * Notice there is no onAdd prop coming from the parent — the component
 * talks to the store itself.
 */
function FilmCard({ film }) {
  const dispatch = useDispatch()
  const isInCart = useSelector(selectIsInCart(film.id))

  return (
    <article className="film">
      <div className="film__hall">
        <span className="film__hallName">{film.hall.replace('Hall ', '')}</span>
        <span className="film__hallLabel">hall</span>
      </div>

      <div className="film__body">
        <div className="film__head">
          <div>
            <h3 className="film__title">{film.title}</h3>
            <p className="film__meta">
              {film.year} &middot; {film.genre} &middot; {film.screening}
            </p>
          </div>
          <p className="film__price">{film.price} EGP</p>
        </div>

        <div className="film__foot">
          <span className="film__seats">{film.seatsLeft} seats left</span>

          <button
            type="button"
            className="btn btn--primary btn--sm"
            /* dispatch: this is how a component updates Redux state */
            onClick={() => dispatch(addTicket(film))}
          >
            {/* Ternary: the label reflects what is already in the cart */}
            {isInCart ? 'Add another' : 'Add ticket'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default FilmCard
