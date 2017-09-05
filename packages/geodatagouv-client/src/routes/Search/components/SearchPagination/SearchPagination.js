import React from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

import Paginate from 'react-paginate'

import styles from './SearchPagination.scss'

const SearchPagination = ({
  t,
  page,
  pageCount,
  onPageChange,
  previousLabel = t('SearchPagination.previous'),
  nextLabel = t('SearchPagination.next'),
  breakLabel = '…'
}) => {
  const selected = page - 1 || 0

  return (
    <Paginate
      previousLabel={previousLabel}
      nextLabel={nextLabel}
      breakLabel={breakLabel}

      pageCount={pageCount}
      initialPage={selected}

      marginPagesDisplayed={2}
      pageRangeDisplayed={5}

      onPageChange={onPageChange}

      containerClassName={styles.container}
      pageClassName={styles.page}
      breakClassName={styles.break}
      pageLinkClassName={styles.pageLink}
      previousClassName={styles.page}
      previousLinkClassName={styles.pageLink}
      nextClassName={styles.page}
      nextLinkClassName={styles.pageLink}
      activeClassName={styles.active}
    />
  )
}

SearchPagination.propTypes = {
  page: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,

  onPageChange: PropTypes.func.isRequired,

  previousLabel: PropTypes.string,
  nextLabel: PropTypes.string,
  breakLabel: PropTypes.string,

  t: PropTypes.func.isRequired
}

export default translate('Search')(SearchPagination)
