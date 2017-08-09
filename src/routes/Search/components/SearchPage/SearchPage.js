import React from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'

import { unionWith, isEqual } from 'lodash'

import Loader from 'common/components/Loader'
import SearchInput from 'common/components/SearchInput'

import FiltersSummary from '../FiltersSummary'
import SearchResults from '../SearchResults'

import styles from './SearchPage.scss'

class SearchPage extends React.PureComponent {
  static propTypes = {
    query: PropTypes.shape({
      textInput: PropTypes.string,
      page: PropTypes.number.isRequired,
      filters: PropTypes.array.isRequired
    }).isRequired,

    search: PropTypes.shape({
      pending: PropTypes.bool.isRequired,
      error: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
      ]).isRequired,
      query: PropTypes.object.isRequired,
      results: PropTypes.array.isRequired,
      facets: PropTypes.object.isRequired
    }).isRequired,

    update: PropTypes.func.isRequired,

    t: PropTypes.func.isRequired
  }

  addFilter = filter => {
    const { update, query } = this.props

    update({
      filters: unionWith(query.filters, [filter], isEqual),
      page: 1
    })
  }

  removeFilter = filter => {
    const { update, query } = this.props

    update({
      filters: query.filters.filter(f => f.name !== filter.name || f.value !== filter.value),
      page: 1
    })
  }

  updateQuery = query => {
    const { update } = this.props

    update({
      q: query,
      page: 1
    })
  }

  changePage = ({ selected }) => {
    const { update, query } = this.props

    const page = selected + 1

    if (query.page !== page) {
      update({
        page: page
      })
    }
  }

  render() {
    const { query, search, t } = this.props

    return (
      <DocumentTitle title={t('SearchPage.documentTitle')}>
        <div className={styles.container}>
          <div className={styles.search}>
            <SearchInput
              defaultValue={query.textInput}
              onSearch={this.updateQuery}
              hasButton
            />
            <FiltersSummary
              filters={query.filters}
              removeFilter={this.removeFilter}
            />
          </div>

          <Loader loading={search.pending} error={search.error}>
            <SearchResults
              page={query.page}
              query={search.query}
              count={search.count}
              results={search.results}
              facets={search.facets}
              addFilter={this.addFilter}
              changePage={this.changePage}
            />
          </Loader>
        </div>
      </DocumentTitle>
    )
  }
}

export default translate('Search')(SearchPage)
