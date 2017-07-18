import React from 'react'
import DocumentTitle from 'react-document-title'

import { unionWith, isEqual } from 'lodash'

import Loader from 'common/components/Loader'
import SearchInput from 'common/components/SearchInput'

import FiltersSummary from '../FiltersSummary'
import SearchResults from '../SearchResults'

import styles from './SearchPage.scss'

class SearchPage extends React.Component {
  addFilter = filter => {
    const { update, query } = this.props

    update({
      filters: unionWith(query.filters, [filter], isEqual)
    })
  }

  removeFilter = filter => {
    const { update, query } = this.props

    update({
      filters: query.filters.filter(f => f.name !== filter.name || f.value !== filter.value)
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

  updateQuery = query => {
    const { update } = this.props

    update({
      q: query
    })
  }

  render() {
    const { query, search } = this.props

    return (
      <DocumentTitle title={'Recherche jeu de données'}>
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

export default SearchPage
