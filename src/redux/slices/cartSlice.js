import { createSlice } from '@reduxjs/toolkit'

/**
 * ============================================================
 * REDUX — global state piece #2: the TICKET CART
 * ============================================================
 *
 * createSlice generates the action creators and the reducer together.
 * Redux Toolkit includes Immer, so writing `state.items.push(...)` is safe:
 * it looks like mutation but produces a new state behind the scenes.
 */

const initialState = {
  items: [], // { id, title, hall, screening, price, quantity }
  lastAction: null, // small piece of feedback for the UI
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add one ticket. If the film is already in the cart, bump its quantity.
    addTicket: (state, action) => {
      const film = action.payload
      const existing = state.items.find((item) => item.id === film.id)

      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({
          id: film.id,
          title: film.title,
          hall: film.hall,
          screening: film.screening,
          price: film.price,
          quantity: 1,
        })
      }

      state.lastAction = `Added a ticket for ${film.title}`
    },

    // Remove a film from the cart completely, whatever its quantity.
    removeTicket: (state, action) => {
      const id = action.payload
      const removed = state.items.find((item) => item.id === id)

      state.items = state.items.filter((item) => item.id !== id)
      state.lastAction = removed ? `Removed ${removed.title}` : null
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find((entry) => entry.id === action.payload)
      if (item) {
        item.quantity += 1
        state.lastAction = `${item.title} — ${item.quantity} tickets`
      }
    },

    // Going below 1 removes the row entirely.
    decreaseQuantity: (state, action) => {
      const item = state.items.find((entry) => entry.id === action.payload)
      if (!item) return

      if (item.quantity > 1) {
        item.quantity -= 1
        state.lastAction = `${item.title} — ${item.quantity} tickets`
      } else {
        state.items = state.items.filter((entry) => entry.id !== action.payload)
        state.lastAction = `Removed ${item.title}`
      }
    },

    clearCart: (state) => {
      state.items = []
      state.lastAction = 'Cart cleared'
    },
  },
})

// Action creators, generated for us by createSlice.
export const {
  addTicket,
  removeTicket,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions

/* ---------- Selectors: how components read this slice ---------- */

export const selectCartItems = (state) => state.cart.items

export const selectCartCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0)

export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0)

export const selectLastAction = (state) => state.cart.lastAction

// True if this particular film is already in the cart.
export const selectIsInCart = (filmId) => (state) =>
  state.cart.items.some((item) => item.id === filmId)

export default cartSlice.reducer
