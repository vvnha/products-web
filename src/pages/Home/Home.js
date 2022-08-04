import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { ThemeContext } from '../../contexts/theme'
import Header from '../../components/Header/Header'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'
import Footer from '../../components/Footer/Footer'
import Products from '../../components/Home/Products/Products'
import Loader from '../../components/Loader/Loader'

import { getAllProduct } from '../../services/products/product-services'
import './Home.css'
import { PRODUCT_NUMBER_COUNT } from '../../constants'
import Pagination from '../../components/Home/Pagination/Pagination'

function Home() {
  const [{ themeName }] = useContext(ThemeContext)
  const [productList, setProductList] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [totalCount, setTotalCount] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const getDefaultParams = () => {
    if (!searchParams.get('page')) searchParams.set('page', 1)
    if (!searchParams.get('limit'))
      searchParams.set('limit', PRODUCT_NUMBER_COUNT)

    navigate({
      pathname: '/',
      search: searchParams.toString(),
    })

    return {
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
    }
  }

  const getProductList = async () => {
    setIsLoading(true)
    const params = getDefaultParams()

    const response = await getAllProduct(params)
    setProductList(response.data)
    setTotalCount(response.totalCount)
    setIsLoading(false)
  }

  useEffect(() => {
    try {
      getProductList()
    } catch (error) {
      console.log(error)
    }
  }, [searchParams])

  return (
    <div id='top' className={`${themeName} app`}>
      <Header />

      <main>
        {/* <About /> */}
        {isLoading ? <Loader /> : <Products products={productList} />}
        {/* <Skills /> */}
        <Pagination searchParams={searchParams} totalCount={totalCount} />
        {/* <Contact /> */}
      </main>

      <ScrollToTop />
      <Footer />
    </div>
  )
}

export default Home
