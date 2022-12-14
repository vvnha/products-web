import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from 'contexts/theme'

import 'react-toastify/dist/ReactToastify.css'

import App from './App'

import './index.css'

render(
  <>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
    <ToastContainer />
  </>,
  document.getElementById('root')
)
