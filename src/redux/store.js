import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cartSlice'
import filmsReducer from './slices/filmsSlice'

/**
 * The Redux store.
 *
 * configureStore wires up both slices, and sets up the Redux DevTools
 * and the default middleware without any extra configuration.
 *
 * State shape:
 *   {
 *     cart:  { items: [], lastAction: null },
 *     films: { items: [...], activeGenre: 'All' }
 *   }
 */
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    films: filmsReducer,
  },
})

export default store
