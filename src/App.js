import { Route, Routes } from 'react-router-dom'
import DetailPage from './pages/DetailPage/DetailPage'
import AddEditPage from './pages/AddEditPage/AddEditPage'
import Home from './pages/Home/Home'
import NotFound from './pages/NotFound/NotFound'

const App = () => (
  <Routes>
    <Route exact path='/' element={<Home />} />
    <Route path='/detail/:productCode' element={<DetailPage />} />
    <Route path='/add' element={<AddEditPage />} />
    <Route path='/edit/:productCode' element={<AddEditPage />} />
    <Route path='*' element={<NotFound />} />
  </Routes>
)

export default App
