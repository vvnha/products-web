import '../About/About.css'

const NotFoundContainer = ({ name }) => (
  <div className='about center'>
    <h1>
      Sorry,<span className='about__name'>{name} Not Found</span>
    </h1>
  </div>
)

export default NotFoundContainer
