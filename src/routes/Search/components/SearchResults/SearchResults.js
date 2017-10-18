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

  componentDidMount() {
    window.addEventListener('mousedown', this.closeFilter)
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.closeFilter)
  }

  setFacetsRef = node => {
    this.facetsRef = node
  }

  closeFilter = e => {
    if (this.facetsRef && !this.facetsRef.contains(event.target)) {
      this.setState(() => ({
        showFilters: false
      }))
    }
  }

  toggleFilters = e => {
    e.preventDefault()

    this.setState(state => ({
      showFilters: !state.showFilters
    }))
  }

  render () {
    const { count, page, query, results, facets, addFilter, changePage, t } = this.props
    const { showFilters } = this.state

    const pageCount = results ? Math.ceil(count / query.limit) : 0

    return (
      <div className={styles.container}>
        <div className={styles.row}>
          <SearchResultsCount count={count} />
          <Button action={this.toggleFilters} text={t('SearchResults.filterButtonLabel')} />
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

            <div className={`${styles.facets} ${showFilters ? styles.open : ''}`} ref={this.setFacetsRef}>
              <button onClick={this.toggleFilters} className={styles.button}>
                &times;
              </button>

              <Facets
                facets={facets}
                filters={query.facets}
                addFilter={addFilter}
              />
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
