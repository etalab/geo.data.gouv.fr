import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import Facets from 'common/components/Facets/Facets'

import SearchResultsCount from '../SearchResultsCount'
import SearchResult from '../SearchResult'
import SearchPagination from '../SearchPagination'

import { Button } from 'common/components/Buttons'

import styles from './SearchResults.scss'

class SearchResults extends React.Component {
  static propTypes = {
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
    changePage: PropTypes.func.isRequired,

    t: PropTypes.func.isRequired
  }

  state = {
    showFilters: false
  }

  setOverlayRef = node => {
    this.overlayRef = node
  }

  closeFilter = e => {
    if (this.overlayRef === e.target) {
      this.setState(() => ({
        showFilters: false
      }))

      document.body.classList.remove('no-scroll')
    }
  }

  toggleFilters = e => {
    e.preventDefault()

    const { showFilters } = this.state

    this.setState(() => ({
      showFilters: !showFilters
    }))

    if (!showFilters) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
  }

  render () {
    const { count, page, query, results, facets, addFilter, changePage, t } = this.props
    const { showFilters } = this.state

    const pageCount = results ? Math.ceil(count / query.limit) : 0

    return (
      <div className={styles.container}>
        <div className={styles.row}>
          <SearchResultsCount count={count} />

          <div className={styles.filterOpen}>
            <Button action={this.toggleFilters} text={t('SearchResults.filterButtonLabel')} />
          </div>
        </div>

        {count > 0 && (
          <div className={styles.results}>
            <div>
              {results.map(result => (
                <SearchResult
                  key={result._id}
                  dataset={result}
                  addFilter={addFilter}
                />
              ))}
            </div>

            <div className={showFilters ? styles.filtersOverlay : ''} onClick={this.closeFilter} ref={this.setOverlayRef}>
              <div className={`${styles.facets} ${showFilters ? styles.open : ''}`}>
                <button onClick={this.toggleFilters} className={styles.filterClose}>
                  &times;
                </button>

                <Facets
                  facets={facets}
                  filters={query.facets}
                  addFilter={addFilter}
                />
              </div>
            </div>
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
}

export default translate('Search')(SearchResults)
