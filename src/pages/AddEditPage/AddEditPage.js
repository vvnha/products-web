import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import Loader from '../../components/Loader/Loader'

import { getProductByCode } from '../../services/products/product-services'
import AddEditContainer from '../../components/AddEditPage/AddEditContainer'
import useNotFound from '../../customHooks/useNotFound'
import NotFoundContainer from '../../components/NotFound/NotFoundContainer'

function AddEditPage() {
  const { productCode } = useParams()
  const [productDetail, setProductDetail] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { isError, setIsError } = useNotFound({
    callbackFn: () => {
      getProductDetail(productCode)
    },
  })

  const getProductDetail = async (code) => {
    setIsLoading(true)
    if (productCode) {
      const response = await getProductByCode(code)
      if (response.data?.length > 0) {
        setProductDetail(response.data[0])
      } else {
        setIsError(true)
      }
    }
    setIsLoading(false)
  }

  return (
    <>
      {isError === true && <NotFoundContainer name='Record' />}
      {isLoading && <Loader />}
      {!isError && !isLoading && <AddEditContainer product={productDetail} />}
    </>
  )
}

export default AddEditPage
