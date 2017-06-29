import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'
import { isArray, forEach } from 'lodash'
import { browserHistory } from 'react-router'
import qs from 'qs'

import Datasets from '../../components/Datasets/Datasets'

import { convertFilters } from '../../../../helpers/manageFilters'

const DISABLED_FILTERS = [ 'q', 'page', 'offset', 'limit' ]

export function _extractFilters(query) {
  let filters = []
  forEach(query, function(value, key) {
    if (DISABLED_FILTERS.includes(key)) {
      return
    }

    if (isArray(value)) {
      forEach(value, function(current) {
        filters.push({name: key, value: current})
      })
    } else {
      filters.push({name: key, value})
    }
  })

  return filters
}

export function parseQuery(query) {
  return {
    textInput: query.q,
    page: query.page || 1,
    filters: _extractFilters(query),
  }
}

export function buildSearchQuery(q, filters, page) {
  const qsFilters = convertFilters(filters)
  const qPart = (q && q.length) ? { q } : {}
  const pagePart = (page && page > 1) ? { page } : {}
  return qs.stringify({ ...qPart, ...pagePart, ...qsFilters }, { indices: false })
}

class WrappedDatasets extends Component {
  constructor(props) {
    super(props)
    this.state = parseQuery(props.location.query)

    this.updateQuery = this.updateQuery.bind(this)
  }

  componentDidMount() {
    this.handle = browserHistory.listen(location => {
      if (location.pathname === '/search' && location.action === 'POP') {
        this.setState({ query: parseQuery(location.query) })
      }
    })
  }

  componentWillUnmount() {
    this.handle()
  }

  pushToHistory() {
    let { textInput, filters, page } = this.state
    const query = buildSearchQuery(textInput, filters, page)
    if (window.location.search === `?${query}`) return
    browserHistory.push('/search?' + query)
  }

  updateQuery(changes = {}, pushToHistory = true) {
    this.setState(changes, () => {
      if (pushToHistory) this.pushToHistory()
    })
  }

  render() {
    return (
      <DocumentTitle title={'Recherche jeu de données'}>
        <Datasets
          query={this.state}
          updateQuery={this.updateQuery}
        />
      </DocumentTitle>
    )
  }
}

export default WrappedDatasets
