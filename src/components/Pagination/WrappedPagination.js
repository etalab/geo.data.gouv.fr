import React from 'react'
import ReactPaginate from 'react-paginate'
import './Pagination.css'

const WrappedPagination = ({max, page, handleChangePage}) => {
  const selected = Number(page - 1) || 0
  return <ReactPaginate previousLabel={'Précédent'}
                 nextLabel={'Suivant'}
                 breakLabel={'...'}
                 breakClassName={'pagination-element-break'}
                 pageNum={max}
                 initialSelected={selected}
                 marginPagesDisplayed={2}
                 pageRangeDisplayed={5}
                 clickCallback={handleChangePage}
                 containerClassName={'pagination'}
                 pageClassName={'pagination-element'}
                 pageLinkClassName={'pagination-element-link'}
                 previousClassName={'pagination-element'}
                 previousLinkClassName={'pagination-element-link'}
                 nextClassName={'pagination-element'}
                 nextLinkClassName={'pagination-element-link'}
                 activeClassName={'pagination-element-active'} />
}

export default WrappedPagination
