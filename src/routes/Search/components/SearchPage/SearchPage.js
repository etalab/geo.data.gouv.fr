import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { Helmet } from 'react-helmet'
import qs from 'querystring'

import { unionWith, isEqual } from 'lodash'

import Loader from 'common/components/Loader'
import SearchInput from 'common/components/SearchInput'

import FiltersSummary from '../FiltersSummary'
import SearchResults from '../SearchResults'

import styles from './SearchPage.scss'

class SearchPage extends React.PureComponent {
  static propTypes = {
    search: PropTypes.shape({
      pending: PropTypes.bool.isRequired,
      error: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
      ]).isRequired,

      search: PropTypes.shape({
        query: PropTypes.object.isRequired,
        results: PropTypes.array.isRequired,
        facets: PropTypes.object.isRequired
      }).isRequired
    }).isRequired,

    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,

    location: PropTypes.shape({
      search: PropTypes.string.isRequired
    }),

    updateQuery: PropTypes.func.isRequired,
    execute: PropTypes.func.isRequired,

    t: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { location, execute } = this.props

    execute(location.search)
  }

  componentWillReceiveProps({ location }) {
    const { execute } = this.props

    if (location !== this.props.location) {
      execute(location.search)
    }
  }

  redirectToQuery = query => {
    const { history } = this.props

    history.push({
      pathname: '/search',
      search: qs.stringify(query)
    })
  }

  addFilter = filter => {
    const { location, updateQuery, search } = this.props

    this.redirectToQuery(
      updateQuery(location.search, {
        filters: unionWith(search.parsedQuery.filters, [filter], isEqual)
      })
    )
  }

  removeFilter = filter => {
    const { location, updateQuery, search } = this.props

    this.redirectToQuery(
      updateQuery(location.search, {
        filters: search.parsedQuery.filters.filter(f => f.name !== filter.name || f.value !== filter.value)
      })
    )
  }

  updateQuery = query => {
    const { location, updateQuery } = this.props

    this.redirectToQuery(
      updateQuery(location.search, {
        q: query
      })
    )
  }

  changePage = ({ selected }) => {
    const { location, updateQuery, search } = this.props

    const page = selected + 1

    if (search.parsedQuery.page !== page) {
      this.redirectToQuery(
        updateQuery(location.search, {
          page: page
        })
      )
    }
  }

  render() {
    const { search, t } = this.props

    return (
      <div className={styles.container}>
        <Helmet title={t('SearchPage.documentTitle')} />
        <div className={styles.search}>
          <SearchInput
            defaultValue={search.parsedQuery.textInput}
            onSearch={this.updateQuery}
            hasButton
          />
          <FiltersSummary
            filters={search.parsedQuery.filters}
            removeFilter={this.removeFilter}
          />
        </div>

        <Loader isLoading={search.pending} error={search.error}>
          <SearchResults
            page={search.parsedQuery.page}
            query={search.search.query}
            count={search.search.count}
            results={search.search.results}
            facets={search.search.facets}
            addFilter={this.addFilter}
            changePage={this.changePage}
          />
        </Loader>
      </div>
    )
  }
}

export default translate('Search')(SearchPage)
