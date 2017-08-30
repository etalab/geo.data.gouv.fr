import React from 'react'
import PropTypes from 'prop-types'

import Facets from 'common/components/Facets/Facets'

import SearchResultsCount from '../SearchResultsCount'
import SearchResult from '../SearchResult'
import SearchPagination from '../SearchPagination'

import styles from './SearchResults.scss'

const SearchResults = ({ count, page, query, results, facets, addFilter, changePage }) => {
  const pageCount = results ? Math.ceil(count / query.limit) : 0

  return (
    <div>
      <SearchResultsCount count={count} />

      {count > 0 && (
        <div className={styles.results}>
          <div className={styles.result}>
            {results.map(result => (
              <SearchResult
                key={result._id}
                dataset={result}
                addFilter={addFilter}
              />
            ))}
          </div>

          <Facets
            facets={facets}
            filters={query.facets}
            addFilter={addFilter}
          />
        </div>
      )}

      {pageCount > 1 && (
        <div className={styles.paginationWrapper}>
          <SearchPagination
            page={page}
            pageCount={pageCount}
            onPageChange={changePage}
          />
        </div>
      )}
    </div>
  )
}

SearchResults.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  query: PropTypes.shape({
    facets: PropTypes.array.isRequired
  }).isRequired,

  results: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired
  })).isRequired,
  facets: PropTypes.object.isRequired,

  addFilter: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired
}

export default SearchResults
