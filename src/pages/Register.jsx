import { useState } from 'react'
import FormField from '../components/FormField.jsx'
import SuccessMessage from '../components/SuccessMessage.jsx'
import { useForm } from '../hooks/useForm.js'
import { validateRegistration } from '../utils/validateRegistration.js'
import styles from '../styles/Form.module.css'

// Every input starts as an empty string so each one is a controlled input
// from the very first render.
const INITIAL_VALUES = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  plan: '',
  genre: '',
  message: '',
  terms: false,
}

const PLAN_OPTIONS = [
  { value: 'Monthly — 150 EGP', label: 'Monthly — 150 EGP' },
  { value: 'Yearly — 1500 EGP', label: 'Yearly — 1500 EGP (2 months free)' },
  { value: 'Student — 90 EGP', label: 'Student — 90 EGP (ID required)' },
]

const GENRE_OPTIONS = [
  { value: 'Drama', label: 'Drama' },
  { value: 'Sci-Fi', label: 'Sci-Fi' },
  { value: 'Documentary', label: 'Documentary' },
  { value: 'Comedy', label: 'Comedy' },
  { value: 'Horror', label: 'Horror' },
]

function Register() {
  // Holds the submitted data so the success message can echo it back.
  const [submittedData, setSubmittedData] = useState(null)

  const {
    values,
    errors,
    submitAttempted,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    showError,
  } = useForm({
    initialValues: INITIAL_VALUES,
    validate: validateRegistration,
    onSubmit: (data) => {
      // This only runs when validation passed.
      setSubmittedData(data)
    },
  })

  const handleRegisterAnother = () => {
    setSubmittedData(null)
    resetForm()
  }

  // Ternary: swap the whole form out for the success panel.
  if (submittedData) {
    return (
      <div className="container container--narrow">
        <SuccessMessage data={submittedData} onReset={handleRegisterAnother} />
      </div>
    )
  }

  const errorCount = Object.keys(errors).length

  return (
    <div className="container container--narrow">
      <section className="hero">
        <p className="eyebrow">Membership</p>
        <h1 className="hero__title">Join the club</h1>
        <p className="hero__text">
          Fill this in and your card will be waiting at the box office before the
          next screening.
        </p>
      </section>

      {/* noValidate turns off the browser's own bubbles so our messages show */}
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {/* && operator: the summary only appears after a failed submit */}
        {submitAttempted && errorCount > 0 && (
          <div className={styles.formAlert} role="alert">
            {errorCount === 1
              ? 'One field needs attention before you can submit.'
              : `${errorCount} fields need attention before you can submit.`}
          </div>
        )}

        <FormField
          label="Full name"
          name="fullName"
          value={values.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={showError('fullName')}
          placeholder="Nour Abdelrahman"
        />

        <FormField
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={showError('email')}
          placeholder="name@example.com"
        />

        <div className={styles.row}>
          <FormField
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={showError('password')}
            hint="At least 8 characters, with letters and numbers."
          />

          <FormField
            label="Confirm password"
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={showError('confirmPassword')}
          />
        </div>

        <div className={styles.row}>
          <FormField
            label="Phone number"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={showError('phone')}
            placeholder="01012345678"
          />

          <FormField
            label="Membership plan"
            name="plan"
            type="select"
            options={PLAN_OPTIONS}
            value={values.plan}
            onChange={handleChange}
            onBlur={handleBlur}
            error={showError('plan')}
          />
        </div>

        <FormField
          label="Favourite genre"
          name="genre"
          type="select"
          options={GENRE_OPTIONS}
          value={values.genre}
          onChange={handleChange}
          onBlur={handleBlur}
          error={showError('genre')}
          hint="We use this when we plan the monthly vote."
        />

        <FormField
          label="Anything you want us to know"
          name="message"
          type="textarea"
          rows={4}
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          error={showError('message')}
          placeholder="Optional — accessibility needs, a film you want programmed…"
          hint={`${values.message.length}/300 characters`}
        />

        {/* Checkbox is controlled through `checked`, not `value` */}
        <div className={styles.checkboxField}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="terms"
              checked={values.terms}
              onChange={handleChange}
              onBlur={handleBlur}
              className={styles.checkbox}
            />
            <span>I have read the club rules and agree to keep my phone away.</span>
          </label>

          {showError('terms') && (
            <p className={styles.error} role="alert">
              {showError('terms')}
            </p>
          )}
        </div>

        <div className={styles.actions}>
          <button type="submit" className="btn btn--primary">
            Submit registration
          </button>
          <button type="button" className="btn btn--ghost" onClick={resetForm}>
            Clear form
          </button>
        </div>
      </form>
    </div>
  )
}

export default Register
