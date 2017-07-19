import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { getMetrics } from '../modules/actions'

import CatalogPage from '../components/CatalogPage'

export default connect(state => ({
  catalog: state.catalog,
  metrics: state.catalog.metrics,
  search: query => {
    browserHistory.push({
      pathname: '/search',
      query
    })
  }
}), {
  getMetrics
})(CatalogPage)
