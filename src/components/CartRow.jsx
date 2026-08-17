import { useDispatch } from 'react-redux'
import {
  increaseQuantity,
  decreaseQuantity,
  removeTicket,
} from '../redux/slices/cartSlice'

/**
 * One line in the cart. Every button dispatches a different Redux action.
 */
function CartRow({ item }) {
  const dispatch = useDispatch()

  return (
    <li className="cart-row">
      <div className="cart-row__info">
        <h3 className="cart-row__title">{item.title}</h3>
        <p className="cart-row__meta">
          {item.hall} &middot; {item.screening} &middot; {item.price} EGP each
        </p>
      </div>

      <div className="cart-row__qty">
        <button
          type="button"
          className="qty__btn"
          onClick={() => dispatch(decreaseQuantity(item.id))}
          aria-label={`One fewer ticket for ${item.title}`}
        >
          &minus;
        </button>

        <span className="qty__value" aria-live="polite">
          {item.quantity}
        </span>

        <button
          type="button"
          className="qty__btn"
          onClick={() => dispatch(increaseQuantity(item.id))}
          aria-label={`One more ticket for ${item.title}`}
        >
          +
        </button>
      </div>

      <p className="cart-row__total">{item.price * item.quantity} EGP</p>

      <button
        type="button"
        className="cart-row__remove"
        onClick={() => dispatch(removeTicket(item.id))}
        aria-label={`Remove ${item.title} from the cart`}
      >
        Remove
      </button>
    </li>
  )
}

export default CartRow
