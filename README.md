# Cinema Box Office — Context API + Redux Assignment

A ticket-booking app for a small cinema. It carries **two separate pieces of
global state** at the same time, each managed by a different tool:

| State | Managed by | What it holds |
|-------|-----------|---------------|
| Theme (light / dark) | **Context API** | the current theme + a toggle function |
| Ticket cart & films | **Redux Toolkit** | cart items, quantities, totals, genre filter |

---

## How to run

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

---

## File structure

```
cinema-box-office/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                    both providers are set up here
    ├── App.jsx                     routes
    ├── context/
    │   └── ThemeContext.jsx        createContext + Provider + useTheme hook
    ├── redux/
    │   ├── store.js                configureStore
    │   └── slices/
    │       ├── cartSlice.js        the cart
    │       └── filmsSlice.js       catalogue + genre filter
    ├── components/
    │   ├── Layout.jsx
    │   ├── Navbar.jsx              reads Context AND Redux
    │   ├── Footer.jsx              reads Context AND Redux
    │   ├── ThemeToggle.jsx         writes Context
    │   ├── FilmCard.jsx            writes Redux (addTicket)
    │   ├── GenreFilter.jsx         reads + writes the films slice
    │   └── CartRow.jsx             writes Redux (+ / − / remove)
    ├── pages/
    │   ├── Home.jsx
    │   ├── Cart.jsx
    │   └── NotFound.jsx
    ├── data/
    │   └── films.js
    └── styles/
        └── index.css               both palettes live here
```

---

## Part 1 — Context API (the theme)

**`src/context/ThemeContext.jsx`** does three things:

1. `createContext(null)` creates the context.
2. `ThemeProvider` holds the theme in `useState`, writes `data-theme` onto the
   `<html>` element with `useEffect` (which is what swaps the CSS variables),
   and remembers the choice in localStorage.
3. `useTheme()` is a small custom hook wrapping `useContext`. Components call
   this instead of `useContext(ThemeContext)` directly, and it throws a clear
   error if used outside the Provider.

### Components consuming the context — no props involved

| Component | What it does with the theme |
|-----------|------------------------------|
| `ThemeToggle.jsx` | reads `theme`, calls `toggleTheme()` |
| `Navbar.jsx` | reads `isDark` for the strip line under the nav |
| `Footer.jsx` | prints the active theme name |
| `Home.jsx` | changes a sentence of copy based on the theme |
| `Cart.jsx` | mentions the theme in the empty-cart message |
| `NotFound.jsx` | shows the theme on the 404 page |

`ThemeToggle` sits inside `Navbar`, which sits inside `Layout`, which is
rendered by a route. **The theme is never passed as a prop through any of those
levels** — that is the whole point of Context.

---

## Part 2 — Redux Toolkit (the cart)

**`src/redux/store.js`** combines two slices with `configureStore`:

```js
export const store = configureStore({
  reducer: { cart: cartReducer, films: filmsReducer },
})
```

### `cartSlice.js` — initial state and reducers

```js
const initialState = { items: [], lastAction: null }
```

| Reducer | What it does |
|---------|--------------|
| `addTicket` | adds a film, or bumps quantity if it is already in the cart |
| `removeTicket` | drops a film entirely |
| `increaseQuantity` | +1 |
| `decreaseQuantity` | −1, and removes the row if it would hit 0 |
| `clearCart` | empties everything |

Redux Toolkit includes Immer, so reducers are written as if mutating
(`state.items.push(...)`) while still producing new state underneath.

### `filmsSlice.js` — the second slice

Holds the catalogue plus `activeGenre`, with a `setActiveGenre` reducer.

### `useSelector` — reading Redux state

| Where | Selector |
|-------|----------|
| `Navbar.jsx` | `selectCartCount` → the badge next to "Cart" |
| `Footer.jsx` | `selectCartCount`, `selectCartTotal` |
| `Home.jsx` | `selectVisibleFilms`, `selectActiveGenre`, `selectLastAction` |
| `Cart.jsx` | `selectCartItems`, `selectCartCount`, `selectCartTotal` |
| `FilmCard.jsx` | `selectIsInCart(film.id)` → switches the button label |
| `GenreFilter.jsx` | `selectGenres`, `selectActiveGenre` |

### `useDispatch` — updating Redux state

| Where | Dispatches |
|-------|-----------|
| `FilmCard.jsx` | `addTicket(film)` |
| `CartRow.jsx` | `increaseQuantity`, `decreaseQuantity`, `removeTicket` |
| `Cart.jsx` | `clearCart()` |
| `GenreFilter.jsx` | `setActiveGenre(genre)` |

---

## How the two systems sit together

`src/main.jsx` nests both providers:

```jsx
<Provider store={store}>       {/* Redux  */}
  <ThemeProvider>              {/* Context */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
</Provider>
```

`Navbar.jsx` and `Footer.jsx` are the clearest demonstration — a single
component reading from both at once:

```jsx
const { isDark }  = useTheme()                 // Context API
const cartCount   = useSelector(selectCartCount) // Redux
```

The footer prints both values on every page, labelled with which system they
come from, so the split is visible while you use the app.

---

## Things to try

1. Click the theme button in the navbar — the whole site switches, and the
   footer, navbar strip and page copy all update from the same Context value.
2. Refresh the page — the theme is remembered.
3. Add a ticket on the schedule — the navbar badge appears; the button changes
   to "Add another".
4. Add the same film again — the badge counts up but the cart still shows one row.
5. Filter by **Sci-Fi** — that is the second Redux slice at work.
6. Go to the cart and use **+ / − / Remove** — each button dispatches a
   different action, and the total updates instantly.
7. Watch the footer the whole time — the Context value and the Redux values
   change independently of each other.
8. Press **Confirm booking** — `clearCart()` runs and the badge disappears.

## Optional: Redux DevTools

`configureStore` enables the Redux DevTools automatically. With the browser
extension installed you can watch each dispatched action and the state changing.
