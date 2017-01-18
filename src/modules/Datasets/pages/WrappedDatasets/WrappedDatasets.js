import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'
import { isArray, forEach } from 'lodash'
import { browserHistory } from 'react-router'

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
  return {
    textInput: query.q,
    page: query.page || 1,
    filters: _extractFilters(query),
  }
}

function handleLocation(location) {
  console.log({ query: parseQuery(location.query), pathname: location.pathname })
  return { query: parseQuery(location.query), pathname: location.pathname }
}

class WrappedDatasets extends Component {
  constructor(props) {
    super(props)
    this.state = handleLocation(props.location)
  }

  componentDidMount() {
    this.handle = browserHistory.listen(location => {
      if (location.pathname !== '/datasets' && location.pathname !== '/records') return;
      if (location.action !== 'POP') return
      this.setState(handleLocation(location))
    })
  }

  componentWillUnmount() {
    this.handle()
  }

  render() {
    const { query, pathname } = this.state
    return (
      <DocumentTitle title={'Recherche jeu de données'}>
        <Datasets pathname={pathname} query={query}/>
      </DocumentTitle>
    )
  }
}

export default WrappedDatasets
