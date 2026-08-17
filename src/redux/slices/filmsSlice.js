import { createSlice } from '@reduxjs/toolkit'
import { films } from '../../data/films'

/**
 * A second Redux slice.
 *
 * Holds the film catalogue and which genre filter is currently selected,
 * so the Home page reads its list from Redux and dispatches an action to
 * change the filter.
 */

const initialState = {
  items: films,
  activeGenre: 'All',
}

const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    setActiveGenre: (state, action) => {
      state.activeGenre = action.payload
    },
  },
})

export const { setActiveGenre } = filmsSlice.actions

/* ---------- Selectors ---------- */

export const selectAllFilms = (state) => state.films.items

export const selectActiveGenre = (state) => state.films.activeGenre

// The list after the genre filter has been applied.
export const selectVisibleFilms = (state) => {
  const { items, activeGenre } = state.films
  return activeGenre === 'All'
    ? items
    : items.filter((film) => film.genre === activeGenre)
}

// Every genre that exists, with "All" in front.
export const selectGenres = (state) => [
  'All',
  ...new Set(state.films.items.map((film) => film.genre)),
]

export default filmsSlice.reducer
