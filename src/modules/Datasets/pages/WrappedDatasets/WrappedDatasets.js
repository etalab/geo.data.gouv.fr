/* eslint no-console: off */
import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import DocumentTitle from 'react-document-title'
import { isArray, forEach } from 'lodash'
import qs from 'qs'

import Datasets from '../../components/Datasets/Datasets'

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
  const parse = qs.parse(query)

  return {
    textInput: parse.q,
    page: parse.page,
    filters: _extractFilters(parse),
  }
}

class WrappedDatasets extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: this.props.location.search,
      query: parseQuery(this.props.location.query)
    }
  }

  updateQuery() {
    this.setState({query: parseQuery(this.props.location.query)})
  }

  render() {
    browserHistory.listen( location => {
      if (location.pathname === '/datasets' || location.pathname === '/records') {
        if (location.action === 'POP' ) {
          if (location.search !== this.state.search) window.location.reload()
        }
      }
    })

    return (
      <DocumentTitle title={'Recherche jeu de données'}>
        <Datasets pathname={this.props.location.pathname} query={this.state.query}/>
      </DocumentTitle>
    )
  }
}

export default WrappedDatasets
