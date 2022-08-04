import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import './Pagination.css'

function Pagination(props) {
  const { searchParams, totalCount } = props
  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] = useState(1)

  const navigate = useNavigate()

  const getCurrentPage = () => ({
    page: searchParams.get('page'),
    limit: searchParams.get('limit'),
  })

  useEffect(() => {
    if (searchParams) {
      const page = Number(getCurrentPage().page) || 1
      const limit = Number(getCurrentPage().limit) || 1
      setCurrentPage(page)
      setPageCount(Math.ceil(totalCount / limit))
    }
  }, [searchParams, getCurrentPage()])

  const handleClick = (e, page) => {
    e.preventDefault()
    if (page <= 0 || page > pageCount) return
    searchParams.set('page', page)
    navigate({
      pathname: '/',
      search: searchParams.toString(),
    })
  }

  return (
    <section className='section skills' id='skills'>
      <nav className='posts-nav' aria-label='Posts navigation'>
        <ul className='pagination__list row'>
          <li className='pagination__list-item btn btn--plain'>
            <a
              className='page-link col-md-6'
              href='!#'
              onClick={(e) => handleClick(e, 1)}
            >
              First
            </a>
          </li>
          <li className='pagination__list-item btn btn--plain col-md-6'>
            <a
              className='page-link'
              href='!#'
              onClick={(e) => handleClick(e, currentPage - 1)}
              aria-label='Previous'
            >
              <span aria-hidden='true'>Previous</span>
            </a>
          </li>
          <li className='pagination__list-item btn btn--plain'>
            {currentPage}
          </li>
          <li className='pagination__list-item btn btn--plain'>
            <a
              className='page-link'
              href='!#'
              onClick={(e) => handleClick(e, currentPage + 1)}
              aria-label='Next'
            >
              <span aria-hidden='true'>Next</span>
            </a>
          </li>
          <li className='pagination__list-item btn btn--plain'>
            <a
              className='page-link'
              onClick={(e) => handleClick(e, pageCount)}
              href='!#'
            >
              Last
            </a>
          </li>
        </ul>
      </nav>
    </section>
    // <nav className='posts-nav' aria-label='Posts navigation'>
    //   <ul id='pagination' className='pagination justify-content-center'>
    //     <li className='page-item'>
    // <a className='page-link' href='!#' onClick={(e) => handleClick(e, 1)}>
    //   &laquo; First
    // </a>
    //     </li>
    //     <li className='page-item'>
    // <a
    //   className='page-link'
    //   href='!#'
    //   onClick={(e) => handleClick(e, currentPage - 1)}
    //   aria-label='Previous'
    // >
    //   <span aria-hidden='true'> Previous</span>
    // </a>
    //     </li>
    //     <li className='page-item'>
    //       <a className='page-link' href='!#'>
    //         {currentPage}
    //       </a>
    //     </li>
    //     <li className='page-item'>
    // <a
    //   className='page-link'
    //   href='!#'
    //   onClick={(e) => handleClick(e, currentPage + 1)}
    //   aria-label='Next'
    // >
    //   <span aria-hidden='true'>Next &raquo;</span>
    // </a>
    //     </li>
    //     <li className='page-item'>
    // <a
    //   className='page-link'
    //   onClick={(e) => handleClick(e, pageCount)}
    //   href='!#'
    // >
    //   Last
    // </a>
    //     </li>
    //   </ul>
    // </nav>
  )
}

Pagination.propTypes = {
  searchParams: PropTypes.any,
  totalCount: PropTypes.number,
}

Pagination.defaultProps = {
  searchParams: null,
  totalCount: 0,
}

export default Pagination
