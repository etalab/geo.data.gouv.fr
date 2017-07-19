import { connect } from 'react-redux'

import { getMetrics } from '../modules/actions'

import CatalogPage from '../components/CatalogPage'

export default connect(state => ({
  catalog: state.catalog,
  metrics: state.catalog.metrics
}), {
  getMetrics
})(CatalogPage)
