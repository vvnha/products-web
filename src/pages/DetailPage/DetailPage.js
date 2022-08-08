import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'

import { getProductByCode } from '../../services/products/product-services'
import ProductDetailContainer from '../../components/ProductDetail/ProductDetailContainer'
import NotFoundContainer from '../../components/NotFound/NotFoundContainer'
import useNotFound from '../../customHooks/useNotFound'

function DetailPage() {
  const { productCode } = useParams()
  const [productDetail, setProductDetail] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { isError, setIsError } = useNotFound({
    callbackFn: () => {
      getProductDetail(productCode)
    },
  })

  const getProductDetail = async (code) => {
    setIsLoading(true)
    const response = await getProductByCode(code)
    if (response.data?.length > 0) {
      setProductDetail(response.data[0])
    } else {
      setIsError(true)
    }

    setIsLoading(false)
  }

  return (
    <>
      {isError === true && <NotFoundContainer name='Record' />}
      {isLoading && <Loader />}
      {!isError && !isLoading && (
        <ProductDetailContainer product={productDetail} />
      )}
    </>
  )
}

export default DetailPage
