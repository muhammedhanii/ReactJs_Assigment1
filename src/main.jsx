import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './App.jsx'
import { store } from './redux/store'
import { ThemeProvider } from './context/ThemeContext.jsx'
import './styles/index.css'

/**
 * Both state systems are set up here, side by side:
 *
 *   <Provider store={store}>   → makes the REDUX store available (cart, films)
 *   <ThemeProvider>            → makes the CONTEXT value available (theme)
 *
 * Every component below can now read either one without any prop drilling.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
