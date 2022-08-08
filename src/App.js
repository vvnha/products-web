import { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import DetailPage from './pages/DetailPage/DetailPage'
import AddEditPage from './pages/AddEditPage/AddEditPage'
import Home from './pages/Home/Home'
import NotFound from './pages/NotFound/NotFound'
import Header from './components/Header/Header'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Footer from './components/Footer/Footer'
import { ThemeContext } from './contexts/theme'

const App = () => {
  const [{ themeName }] = useContext(ThemeContext)
  return (
    <div id='top' className={`${themeName} app`}>
      <Header />

      <main>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/detail/:productCode' element={<DetailPage />} />
          <Route path='/add' element={<AddEditPage />} />
          <Route path='/edit/:productCode' element={<AddEditPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>

      <ScrollToTop />
      <Footer />
    </div>
  )
}

export default App
