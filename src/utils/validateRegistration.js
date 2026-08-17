/**
 * Validation rules for the membership form.
 *
 * Takes the current values and returns an object of error messages.
 * An empty object means the form is valid.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i
// Accepts 01xxxxxxxxx (Egypt) or an international +xx number.
const PHONE_PATTERN = /^(01[0-2,5]\d{8}|\+\d{7,15})$/

export function validateRegistration(values) {
  const errors = {}

  // Full name — required, at least two words
  if (!values.fullName.trim()) {
    errors.fullName = 'Full name is required.'
  } else if (values.fullName.trim().length < 3) {
    errors.fullName = 'Please enter at least 3 characters.'
  } else if (!values.fullName.trim().includes(' ')) {
    errors.fullName = 'Please enter your first and last name.'
  }

  // Email — required and well formed
  if (!values.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Enter a valid email, for example name@example.com'
  }

  // Password — required, length, and a mix of letters and numbers
  if (!values.password) {
    errors.password = 'Password is required.'
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.'
  } else if (!/[a-z]/i.test(values.password) || !/\d/.test(values.password)) {
    errors.password = 'Password must contain both letters and numbers.'
  }

  // Confirm password — must match
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.'
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords do not match.'
  }

  // Phone — required and in a recognised format
  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required.'
  } else if (!PHONE_PATTERN.test(values.phone.replace(/[\s-]/g, ''))) {
    errors.phone = 'Enter a valid number, for example 01012345678'
  }

  // Membership plan — must be chosen
  if (!values.plan) {
    errors.plan = 'Please choose a membership plan.'
  }

  // Favourite genre — must be chosen
  if (!values.genre) {
    errors.genre = 'Please pick a favourite genre.'
  }

  // Message — optional, but capped
  if (values.message.trim().length > 300) {
    errors.message = 'Please keep this under 300 characters.'
  }

  // Terms — must be ticked
  if (!values.terms) {
    errors.terms = 'You must accept the club rules to join.'
  }

  return errors
}
