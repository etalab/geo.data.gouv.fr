import { connect } from 'react-redux'

import { getHarvests, syncCatalog } from '../modules/actions'

import CatalogHarvestsView from '../components/CatalogHarvestsView'

export default connect((state, { catalog }) => ({
  catalog,
  harvests: state.catalog.harvests
}), {
  getHarvests,
  syncCatalog
})(CatalogHarvestsView)
