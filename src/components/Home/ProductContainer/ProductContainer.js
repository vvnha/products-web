import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import './ProductContainer.scss'

const ProductContainer = ({ product }) => {
  const navigate = useNavigate()

  const handleClickSeeDetail = (e) => {
    e.preventDefault()

    if (!product) return

    navigate(`/detail/${product.code}`)
  }

  return (
    <div className='product'>
      <div className='product__name'>
        <h3>{product.name}</h3>
      </div>

      <div className='product__img'>
        <img
          data-id='thumbnail'
          src='https://images.unsplash.com/photo-1523206489230-c012c64b2b48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
          className='card-img-top'
          alt='recipe'
        />
      </div>

      <p className='product__description'>{product.description}</p>
      {/* {product.stack && (
      <ul className='product__stack'>
        {product.stack.map((item) => (
          <li key={uniqid()} className='product__stack-item'>
            {item}
          </li>
        ))}
      </ul>
    )} */}

      <ul className='product__stack'>
        <li className='product__stack-item'>
          <a href='!#' onClick={handleClickSeeDetail}>
            <span type='button' className='btn btn--outline'>
              See product detail
            </span>
          </a>
        </li>
      </ul>
    </div>
  )
}

ProductContainer.propTypes = {
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

ProductContainer.defaultProps = {
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

export default ProductContainer
