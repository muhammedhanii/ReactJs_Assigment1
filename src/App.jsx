import { Routes, Route } from 'react-router-dom'

import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Cart from './pages/Cart.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
