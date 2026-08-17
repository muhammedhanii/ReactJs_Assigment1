import { useState } from 'react'

/**
 * CUSTOM HOOK — useForm
 *
 * Holds every form input in React state (controlled inputs), tracks which
 * fields the user has visited, runs the validation function, and calls
 * onSubmit only when there are no errors left.
 *
 * Errors are shown once a field has been blurred, or once the user has
 * pressed Submit — so the form does not shout at someone who is still typing.
 */
export function useForm({ initialValues, validate, onSubmit }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitAttempted, setSubmitAttempted] = useState(false)

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    const nextValue = type === 'checkbox' ? checked : value
    const nextValues = { ...values, [name]: nextValue }

    setValues(nextValues)

    // Re-validate live, but only for fields the user already interacted with.
    if (touched[name] || submitAttempted) {
      setErrors(validate(nextValues))
    }
  }

  const handleBlur = (event) => {
    const { name } = event.target
    setTouched((previous) => ({ ...previous, [name]: true }))
    setErrors(validate(values))
  }

  const handleSubmit = (event) => {
    // Stops the browser from reloading the page.
    event.preventDefault()

    const nextErrors = validate(values)
    setErrors(nextErrors)
    setSubmitAttempted(true)

    // Mark everything as touched so all errors become visible at once.
    const allTouched = Object.keys(values).reduce(
      (accumulator, key) => ({ ...accumulator, [key]: true }),
      {}
    )
    setTouched(allTouched)

    if (Object.keys(nextErrors).length === 0) {
      onSubmit(values)
    }
  }

  const resetForm = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setSubmitAttempted(false)
  }

  // A field's error is only "visible" once it has been touched or submitted.
  const showError = (name) =>
    (touched[name] || submitAttempted) && errors[name] ? errors[name] : ''

  return {
    values,
    errors,
    touched,
    submitAttempted,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    showError,
  }
}
