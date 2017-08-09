import { connect } from 'react-redux'

import { get, getMetrics, getHarvests, syncCatalog } from '../modules/actions'

import CatalogPage from '../components/CatalogPage'

export default connect(({ catalog }) => ({
  catalog: catalog.catalog,
  metrics: catalog.metrics,
  harvests: catalog.harvests,
}), {
  getCatalog: get,
  getMetrics,
  getHarvests,
  syncCatalog
})(CatalogPage)
