import React, { Component } from 'react'
import { isArray, forEach } from 'lodash'
import qs from 'qs'
import Datasets from './Datasets'

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
    this.state = { query: parseQuery(this.props.location.query) }
  }

  render() {
    return <Datasets pathname={this.props.location.pathname} query={this.state.query}/>
  }
}

export default WrappedDatasets
