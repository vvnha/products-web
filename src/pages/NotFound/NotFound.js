import { useContext } from 'react'
import { ThemeContext } from '../../contexts/theme'
import Header from '../../components/Header/Header'
// import About from '../../components/About/About'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'
// import Contact from '../../components/Contact/Contact'
import Footer from '../../components/Footer/Footer'
import NotFoundContainer from '../../components/NotFound/NotFoundContainer'

const NotFound = () => {
  const [{ themeName }] = useContext(ThemeContext)

  return (
    <div id='top' className={`${themeName} app`}>
      <Header />

      <main>
        <NotFoundContainer name='Page' />
      </main>

      <ScrollToTop />
      <Footer />
    </div>
  )
}

export default NotFound
