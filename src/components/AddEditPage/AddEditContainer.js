import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import _get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty'
import { toast } from 'react-toastify'

import { useNavigate } from 'react-router-dom'
import {
  createProduct,
  getProductByCode,
  updateProduct,
} from 'services/products/product-services'

import './AddEditContainer.scss'

const AddEditContainer = ({ product }) => {
  const [isSaveLoading, setIsSaveLoading] = useState(false)
  const [productDetail, setProductDetail] = useState(null)
  const navigate = useNavigate()

  const handleBack = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  const handleSaveProduct = async (formValues) => {
    try {
      setIsSaveLoading(true)

      const isCreated = _isEmpty(product)

      if (isCreated) {
        const response = await getProductByCode(formValues.code)

        if (response.data.length > 0) {
          toast('This record is existed')
          setIsSaveLoading(false)
          return
        }
      }

      const newData = !isCreated
        ? await updateProduct({ ...formValues, id: productDetail.id })
        : await createProduct(formValues)

      if (!isCreated) {
        setProductDetail(newData)
      } else {
        console.log(newData)
      }
      setIsSaveLoading(false)

      toast('Update product successfully!')
      setTimeout(() => {
        navigate(`/detail/${newData.code}`)
      }, 1000)
    } catch (error) {
      console.log(error)
    }
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: _get(productDetail, 'name', ''),
      code: _get(productDetail, 'code', ''),
      category: _get(productDetail, 'category', ''),
      brand: _get(productDetail, 'brand', ''),
      type: _get(productDetail, 'type', ''),
      price: _get(productDetail, 'price', ''),
      description: _get(productDetail, 'description', ''),
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Please fill the product name!'),
      code: Yup.string().required('Please fill the product code!'),
      category: Yup.string().required('Please fill the product category!'),
      brand: Yup.string(),
      type: Yup.string(),
      price: Yup.number(),
      description: Yup.string(),
    }),
    onSubmit: (values) => {
      handleSaveProduct(values)
    },
  })

  useEffect(() => {
    if (product && Object.keys(product).length > 0) {
      setProductDetail(product)
    }
  }, [])
  return (
    <div className='product__form'>
      <h3 className='product__form__title'>
        {product ? product.name : 'Create new Product'}
      </h3>

      <div className='product__form__img'>
        <img
          data-id='thumbnail'
          src='https://images.unsplash.com/photo-1523206489230-c012c64b2b48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
          className='card-img-top'
          alt='recipe'
          hidden
        />
      </div>

      <form id='postForm' className='post-form' onSubmit={formik.handleSubmit}>
        <div className='form__group'>
          <label htmlFor='product__form__name'>Product Name*</label>
          <input
            id='product-name'
            type='text'
            className='form-control'
            name='name'
            placeholder='Eg: Iphone 13 Pro'
            onChange={formik.handleChange}
            value={formik.values.name}
          />

          {formik.errors.name ? (
            <div className='invalid-field'>{formik.errors.name}</div>
          ) : null}
        </div>

        <div className='form__group mb-3'>
          <label htmlFor='product-code'>Code*</label>
          <input
            id='product-code'
            type='text'
            className='form-control'
            name='code'
            placeholder='Eg: 123'
            onChange={formik.handleChange}
            value={formik.values.code}
          />

          {formik.errors.code ? (
            <div className='invalid-field'>{formik.errors.code}</div>
          ) : null}
        </div>

        <div className='form__group mb-3'>
          <label htmlFor='product-category'>Category*</label>
          <input
            id='product-category'
            type='text'
            className='form-control'
            name='category'
            placeholder='Eg: 123'
            onChange={formik.handleChange}
            value={formik.values.category}
          />
          {formik.errors.category ? (
            <div className='invalid-field'>{formik.errors.category}</div>
          ) : null}
        </div>

        <div className='row'>
          <div className='form__group col-md-6 mb-3'>
            <label htmlFor='product-brand'>Brand</label>
            <input
              id='product-brand'
              type='text'
              className='form-control'
              name='brand'
              placeholder='Eg: 123'
              onChange={formik.handleChange}
              value={formik.values.brand}
            />
            {formik.errors.brand ? (
              <div className='invalid-field'>{formik.errors.brand}</div>
            ) : null}
          </div>

          <div className='form__group col-md-6 mb-3'>
            <label htmlFor='product-type'>Type</label>
            <input
              id='product-type'
              type='text'
              className='form-control'
              name='type'
              placeholder='Eg: Mobile Phones'
              onChange={formik.handleChange}
              value={formik.values.type}
            />
            {formik.errors.type ? (
              <div className='invalid-field'>{formik.errors.type}</div>
            ) : null}
          </div>
        </div>

        <div className='form__group mb-3'>
          <label htmlFor='product-price'>Price($)</label>
          <input
            id='product-price'
            type='text'
            className='form-control'
            name='price'
            placeholder='Eg: 100'
            onChange={formik.handleChange}
            value={formik.values.price}
          />
          {formik.errors.price ? (
            <div className='invalid-field'>{formik.errors.price}</div>
          ) : null}
        </div>

        <div className='form__group mb-3'>
          <label htmlFor='product-desc'>Description</label>
          <textarea
            id='product-desc'
            className='form-control'
            name='description'
            rows='3'
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          {formik.errors.description ? (
            <div className='invalid-field'>{formik.errors.description}</div>
          ) : null}
        </div>

        <div className='form__group mb-3' hidden>
          <button type='button' className='btn btn-primary uploadImage' hidden>
            Upload File
          </button>
        </div>

        <div
          className='input-group mb-3'
          data-id='imageSource'
          data-image-source='upload'
          hidden
        >
          <label className='input-group-text' htmlFor='uploadImage' hidden>
            Upload
          </label>

          <input
            name='image'
            type='file'
            className='form-control'
            id='uploadImage'
            accept='image/*'
            hidden
          />

          <div className='invalid-feedback' />
        </div>

        {/* <div className='text-center d-flex justify-content-center'>
          <button
            type='button'
            className='btn btn-danger btn-save me-3'
            // onClick={handleBack}
          >
            Back
          </button>

          <button
            type='submit'
            className='btn btn-success btn-cancel me-3'
            disabled={isSaveLoading}
          >
            {isSaveLoading ? 'Saving...' : 'Save changes'}
          </button>
        </div> */}

        <ul className='product__form__stack'>
          <li className='product__form__stack-item'>
            <button
              type='button'
              onClick={handleBack}
              className='btn btn--outline--secondary'
            >
              BACK
            </button>
          </li>
          <li className='product__form__stack-item'>
            <button
              type='submit'
              className='btn btn--outline'
              disabled={isSaveLoading}
            >
              {isSaveLoading ? 'SAVING...' : 'SAVE'}
            </button>
          </li>
        </ul>
      </form>
    </div>
  )
}

export default AddEditContainer
