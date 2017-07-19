import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { getMetrics } from '../modules/actions'

import CatalogPage from '../components/CatalogPage'

export default connect(state => ({
  catalog: state.catalog,
  metrics: state.catalog.metrics,
  search: (q, catalog) => {
    browserHistory.push({
      pathname: '/search',
      query: {
        q,
        catalog
      }
    })
  }
}), {
  getMetrics
})(CatalogPage)
