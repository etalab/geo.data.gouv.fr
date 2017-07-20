import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { getHarvests, syncCatalog } from '../modules/actions'

import CatalogPage from '../components/CatalogPage'

export default connect(
  state => ({
    catalog: state.catalog,
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
    getHarvests,
    syncCatalog
  }
)(CatalogPage)
