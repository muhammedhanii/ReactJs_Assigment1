import styles from '../styles/Form.module.css'

/**
 * Reusable form field.
 *
 * Renders a label, an input (or select / textarea), and the error message
 * underneath. Everything it needs arrives through props, so the same
 * component covers every field on the page.
 */
function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  hint,
  options,
  rows,
}) {
  const fieldId = `field-${name}`
  const errorId = `${fieldId}-error`
  const isInvalid = Boolean(error)

  // Shared props so every control behaves the same way.
  const shared = {
    id: fieldId,
    name,
    value,
    onChange,
    onBlur,
    'aria-invalid': isInvalid,
    'aria-describedby': isInvalid ? errorId : undefined,
    className: `${styles.control} ${isInvalid ? styles.controlInvalid : ''}`,
  }

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={fieldId}>
        {label}
      </label>

      {/* Which control to render depends on the `type` prop */}
      {type === 'select' ? (
        <select {...shared}>
          <option value="">Choose one…</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea {...shared} rows={rows || 4} placeholder={placeholder} />
      ) : (
        <input {...shared} type={type} placeholder={placeholder} />
      )}

      {/* && operator: the hint only shows when there is no error */}
      {hint && !isInvalid && <p className={styles.hint}>{hint}</p>}

      {/* && operator: the error only renders when there is one */}
      {isInvalid && (
        <p className={styles.error} id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default FormField
