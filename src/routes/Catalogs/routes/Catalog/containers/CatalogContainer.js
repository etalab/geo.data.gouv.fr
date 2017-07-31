import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { get, getMetrics, getHarvests, syncCatalog } from '../modules/actions'

import CatalogPage from '../components/CatalogPage'

export default connect(
  (state, ownProps) => ({
    catalogId: ownProps.params.catalogId,

    catalog: state.catalog.catalog,
    metrics: state.catalog.metrics,
    harvests: state.catalog.harvests,

    search: query => {
      browserHistory.push({
        pathname: '/search',
        query
      })
    }
  }),

  {
    getCatalog: get,
    getMetrics,
    getHarvests,
    syncCatalog
  }
)(CatalogPage)
