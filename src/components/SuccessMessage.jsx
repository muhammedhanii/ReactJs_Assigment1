import { Link } from 'react-router-dom'
import styles from '../styles/Form.module.css'

/**
 * Shown after the form has been submitted with valid data.
 * Echoes back what was sent so the user can check it.
 */
function SuccessMessage({ data, onReset }) {
  return (
    <div className={styles.success} role="status">
      <p className={styles.successBadge}>Membership confirmed</p>

      <h2 className={styles.successTitle}>Welcome, {data.fullName}.</h2>

      <p className={styles.successText}>
        Your card is ready at the box office. We sent the details to{' '}
        <strong>{data.email}</strong>.
      </p>

      <dl className={styles.summary}>
        <div className={styles.summaryRow}>
          <dt>Plan</dt>
          <dd>{data.plan}</dd>
        </div>
        <div className={styles.summaryRow}>
          <dt>Phone</dt>
          <dd>{data.phone}</dd>
        </div>
        <div className={styles.summaryRow}>
          <dt>Favourite genre</dt>
          <dd>{data.genre}</dd>
        </div>

        {/* && operator: this row only appears if a message was typed */}
        {data.message.trim() && (
          <div className={styles.summaryRow}>
            <dt>Note</dt>
            <dd>{data.message}</dd>
          </div>
        )}
      </dl>

      <div className={styles.successActions}>
        <button type="button" className="btn btn--ghost" onClick={onReset}>
          Register someone else
        </button>
        <Link to="/" className="btn btn--primary">
          Back to the schedule
        </Link>
      </div>
    </div>
  )
}

export default SuccessMessage
