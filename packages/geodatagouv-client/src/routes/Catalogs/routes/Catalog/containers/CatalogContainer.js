import { connect } from 'react-redux'

import { get, getMetrics } from '../modules/actions'

import CatalogPage from '../components/CatalogPage'

export default connect(({ catalog }) => ({
  catalog: catalog.catalog,
  metrics: catalog.metrics
}), {
  getCatalog: get,
  getMetrics
})(CatalogPage)
