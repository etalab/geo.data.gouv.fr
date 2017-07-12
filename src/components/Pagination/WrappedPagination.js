import React from 'react'
import ReactPaginate from 'react-paginate'
import style from './WrappedPagination.scss'

const WrappedPagination = ({max, page, handleChangePage}) => {
  const selected = Number(page - 1) || 0
  return <ReactPaginate previousLabel={'Précédent'}
                 nextLabel={'Suivant'}
                 breakLabel={'...'}
                 pageCount={max}
                 forcePage={selected}
                 initialPage={selected}
                 marginPagesDisplayed={2}
                 pageRangeDisplayed={5}
                 onPageChange={handleChangePage}
                 breakClassName={style.paginationElementBreak}
                 containerClassName={style.pagination}
                 pageClassName={style.paginationElement}
                 pageLinkClassName={style.paginationElementLink}
                 previousClassName={style.paginationElement}
                 previousLinkClassName={style.paginationElementLink}
                 nextClassName={style.paginationElement}
                 nextLinkClassName={style.paginationElementLink}
                 activeClassName={style.paginationElementActive} />
}

export default WrappedPagination
