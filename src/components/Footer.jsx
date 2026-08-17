import { useSelector } from 'react-redux'
import { useTheme } from '../context/ThemeContext.jsx'
import { selectCartCount, selectCartTotal } from '../redux/slices/cartSlice'

/**
 * CONTEXT API consumer + REDUX consumer.
 * Sits several levels below the providers and still reads both without props.
 */
function Footer() {
  const { theme } = useTheme() // CONTEXT
  const count = useSelector(selectCartCount) // REDUX
  const total = useSelector(selectCartTotal) // REDUX

  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__note">
          Cinema Box Office &middot; theme: <strong>{theme}</strong> (Context API)
        </p>
        <p className="footer__note">
          Cart: <strong>{count}</strong> tickets &middot;{' '}
          <strong>{total} EGP</strong> (Redux)
        </p>
      </div>
    </footer>
  )
}

export default Footer
