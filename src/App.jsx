import { Routes, Route } from 'react-router-dom'

import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Register from './pages/Register.jsx'
import FilmDetail from './pages/FilmDetail.jsx'
import NotFound from './pages/NotFound.jsx'

/**
 * All the routes of the app.
 *
 * Every page is nested inside <Layout />, so the navigation bar and the
 * footer are rendered once and only the middle section changes.
 */
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* index = the page shown at "/" */}
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="join" element={<Register />} />

        {/* Dynamic route: the :filmId part is read with useParams() */}
        <Route path="films/:filmId" element={<FilmDetail />} />

        {/* Catch-all: any URL that matched nothing above lands here */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
