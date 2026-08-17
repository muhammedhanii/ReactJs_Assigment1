import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'

import CartRow from '../components/CartRow.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import {
  selectCartItems,
  selectCartCount,
  selectCartTotal,
  clearCart,
} from '../redux/slices/cartSlice'

function Cart() {
  // CONTEXT API
  const { theme } = useTheme()

  // REDUX — read
  const items = useSelector(selectCartItems)
  const count = useSelector(selectCartCount)
  const total = useSelector(selectCartTotal)

  // REDUX — write
  const dispatch = useDispatch()

  const [checkedOut, setCheckedOut] = useState(false)

  const handleCheckout = () => {
    setCheckedOut(true)
    dispatch(clearCart())
  }

  if (checkedOut) {
    return (
      <div className="container container--narrow">
        <section className="panel panel--ok">
          <p className="eyebrow">Confirmed</p>
          <h1 className="hero__title">Tickets booked.</h1>
          <p className="hero__text">
            Collect them at the box office 15 minutes before the screening.
          </p>
          <div className="hero__actions">
            <Link to="/" className="btn btn--primary">
              Back to the schedule
            </Link>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => setCheckedOut(false)}
            >
              Book more
            </button>
          </div>
        </section>
      </div>
    )
  }

  // Ternary: empty cart gets its own screen
  if (items.length === 0) {
    return (
      <div className="container container--narrow">
        <section className="panel">
          <p className="eyebrow">Cart</p>
          <h1 className="hero__title">Nothing booked yet.</h1>
          <p className="hero__text">
            Pick a screening from the schedule and it will show up here.
            You are viewing the site in <strong>{theme}</strong> mode.
          </p>
          <Link to="/" className="btn btn--primary">
            See the schedule
          </Link>
        </section>
      </div>
    )
  }

  return (
    <div className="container container--narrow">
      <section className="hero">
        <p className="eyebrow">Cart</p>
        <h1 className="hero__title">
          {count} {count === 1 ? 'ticket' : 'tickets'}
        </h1>
      </section>

      <ul className="cart-list">
        {items.map((item) => (
          <CartRow key={item.id} item={item} />
        ))}
      </ul>

      <div className="cart-summary">
        <div className="cart-summary__line">
          <span>Total</span>
          <strong className="cart-summary__total">{total} EGP</strong>
        </div>

        <div className="cart-summary__actions">
          <button
            type="button"
            className="btn btn--primary"
            onClick={handleCheckout}
          >
            Confirm booking
          </button>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => dispatch(clearCart())}
          >
            Empty cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
