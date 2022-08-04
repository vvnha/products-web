import uniqid from 'uniqid'
import ProductContainer from '../ProductContainer/ProductContainer'
import './Products.css'

const Products = (props) => {
  const { products } = props
  if (!products.length) return null

  return (
    <section id='projects' className='section projects'>
      <h2 className='section__title'>Products</h2>

      <div className='projects__grid'>
        {products.map((product) => (
          <ProductContainer key={uniqid()} product={product} />
        ))}
      </div>
    </section>
  )
}

export default Products
