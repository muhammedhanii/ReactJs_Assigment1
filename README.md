# Cinema Club — ReactJS Assignment (Forms & React Router)

A multi-page React site for a small film club. It demonstrates client-side
routing with React Router DOM and a fully controlled registration form with
validation.

---

## How to run

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

Production build: `npm run build`

---

## File structure

```
cinema-club/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                      BrowserRouter lives here
    ├── App.jsx                       all <Route> definitions
    ├── pages/                        one file per page
    │   ├── Home.jsx
    │   ├── About.jsx
    │   ├── Register.jsx              the form page
    │   ├── FilmDetail.jsx            dynamic route /films/:filmId
    │   └── NotFound.jsx              404 page
    ├── components/                   reusable pieces
    │   ├── Layout.jsx                navbar + <Outlet /> + footer
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── ScrollToTop.jsx
    │   ├── FormField.jsx             one reusable field for every input
    │   ├── SuccessMessage.jsx
    │   └── FilmCard.jsx
    ├── hooks/
    │   └── useForm.js                custom hook: state + validation + submit
    ├── utils/
    │   └── validateRegistration.js   the validation rules
    ├── data/
    │   └── films.js
    └── styles/
        ├── index.css                 global stylesheet
        └── Form.module.css           CSS module for the form
```

---

## Routing

`react-router-dom` is installed as a dependency. `<BrowserRouter>` wraps the app
in `main.jsx`, and all routes are declared in `App.jsx`.

| URL | Page | Notes |
|-----|------|-------|
| `/` | Home | Lists this week's screenings |
| `/about` | About | How the club works |
| `/join` | Register | The registration form |
| `/films/:filmId` | FilmDetail | Dynamic route — id read with `useParams()` |
| `*` | NotFound | 404 for any unknown URL |

Every page is nested inside `<Layout />`, which renders the navbar and footer
once and drops the current page into `<Outlet />`.

**Router features used**

- `BrowserRouter`, `Routes`, `Route` — the route table
- `NavLink` — navbar links; its `isActive` flag highlights the current page
- `Link` — in-page links that navigate without a reload
- `Outlet` — where nested pages render inside the layout
- `useParams()` — reads `:filmId` from the URL in `FilmDetail.jsx`
- `useNavigate()` — the "Back" / "Go back" buttons
- `useLocation()` — the 404 page shows which path was missing; `ScrollToTop`
  uses it to scroll up on every route change

### 404 handling

Two different cases both land on the 404 page:

1. A URL that matches no route at all, e.g. `/shop` — caught by `<Route path="*" />`.
2. A valid route with an id that does not exist, e.g. `/films/batman` — `FilmDetail`
   looks the id up, finds nothing, and renders `<NotFound />`.

---

## The form (`/join`)

### Fields — nine in total

| Field | Type | Validation |
|-------|------|------------|
| Full name | text | required, min 3 chars, must contain first + last name |
| Email | email | required, must match an email pattern |
| Password | password | required, min 8 chars, must mix letters and numbers |
| Confirm password | password | required, must match the password |
| Phone number | tel | required, Egyptian `01xxxxxxxxx` or international `+…` |
| Membership plan | select | required |
| Favourite genre | select | required |
| Message | textarea | optional, max 300 characters |
| Club rules | checkbox | must be ticked |

### How the state works

Every input is a **controlled component** — its `value` comes from React state
and its `onChange` writes back to that state. The whole form lives in one state
object inside the `useForm` custom hook (`src/hooks/useForm.js`):

```js
const [values, setValues]   = useState(initialValues)
const [errors, setErrors]   = useState({})
const [touched, setTouched] = useState({})
```

`handleSubmit` calls `event.preventDefault()`, so the page never reloads.

### How validation behaves

- Errors appear **after you leave a field** (`onBlur`), not while you are still
  typing it for the first time.
- Once a field has an error, it re-validates **live** as you fix it.
- Pressing Submit marks every field as touched, so all remaining errors appear
  at once, plus a summary line at the top of the form.
- `noValidate` is set on the `<form>` so the browser's own popups stay out of
  the way and our messages are the only ones shown.
- Errors are linked to their inputs with `aria-describedby` and `role="alert"`,
  so screen readers announce them.

### Success message

When validation passes, `onSubmit` stores the data in state and the form is
replaced by `<SuccessMessage />`, which greets the user by name and lists back
what they submitted. From there you can register someone else (which resets the
form) or return to the schedule.

---

## Things to try

1. Press **Submit registration** on the empty form — eight errors and a summary appear.
2. Type `abc` in Email and click away — the email error shows immediately.
3. Fix it to `a@b.com` — the error clears as you type.
4. Enter two different passwords — the confirm field catches the mismatch.
5. Fill everything correctly and submit — the success panel appears, no page reload.
6. Click a film title on the Home page — that is the dynamic `/films/:filmId` route.
7. Type `/films/batman` in the address bar — a valid route, unknown id, so 404.
8. Type `/anything` in the address bar — the catch-all 404 route.

---

## Note on deployment

`BrowserRouter` uses real URLs, so if you deploy to static hosting you need a
rewrite rule sending all paths to `index.html`. This is not needed for
`npm run dev`, which handles it automatically.
