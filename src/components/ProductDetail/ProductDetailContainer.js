import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteProduct } from 'services/products/product-services'

import './ProductDetailContainer.scss'

const ProductDetailContainer = ({ product }) => {
  const navigate = useNavigate()

  const handleClickUpdate = (e) => {
    e.preventDefault()
    if (!product) return

    navigate(`/edit/${product.code}`)
  }

  const handleClickDelete = async (e, productId) => {
    e.preventDefault()
    try {
      await deleteProduct(productId)

      toast('Delete product successfully!')

      setTimeout(() => navigate(`/`), 1000)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <section id='projects' className='section projects'>
      <h2 className='section__title'>Product Detail</h2>
      <div className='product__detail'>
        <div className='product__left__detail'>
          <div className='product__img'>
            <img
              data-id='thumbnail'
              src='https://images.unsplash.com/photo-1523206489230-c012c64b2b48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
              className='card-img-top'
              alt='recipe'
            />
          </div>
        </div>
        <div className='product__right__detail'>
          <h3>{product.name}</h3>

          <div className='product__price'>
            <p className='new__price'>
              <span>{`$${product?.price}`}</span>
            </p>
          </div>

          <p className='product__description'>{product.description}</p>

          <div className='product__detail_infor'>
            <ul>
              <li>
                Code: <span>{product?.code}</span>
              </li>
              <li>
                Category: <span>{product?.category}</span>
              </li>
              <li>
                Brand: <span>{product?.brand}</span>
              </li>
              <li>
                Type: <span>{product?.type}</span>
              </li>
            </ul>
          </div>

          <ul className='product__detail__stack'>
            <li className='product__detail__stack-item'>
              <a href='!#' onClick={(e) => handleClickDelete(e, product.id)}>
                <span type='button' className='btn btn--outline--danger'>
                  DELETE
                </span>
              </a>
            </li>
            <li className='product__detail__stack-item'>
              <a href='!#' onClick={handleClickUpdate}>
                <span type='button' className='btn btn--outline'>
                  UPDATE
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

ProductDetailContainer.propTypes = {
  product: PropTypes.shape({
    createdAt: PropTypes.any,
    name: PropTypes.string,
    code: PropTypes.string,
    category: PropTypes.string,
    brand: PropTypes.string,
    type: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    id: PropTypes.any,
  }),
}

ProductDetailContainer.defaultProps = {
  product: {
    createdAt: '2022-08-01T11:07:17.594Z',
    name: 'Practical Granite Gloves',
    code: '123',
    category: 'category 1',
    brand: 'Brand 1',
    type: 'type 1',
    price: 94229.9,
    description:
      'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality',
    id: '1',
  },
}

export default ProductDetailContainer
