import { connect } from 'react-redux'

import { get, getHarvest } from '../../Catalog/modules/actions'

import CatalogHarvestPage from '../components/CatalogHarvestPage'

export default connect(state => ({
  catalog: state.catalog.catalog,
  harvest: state.catalog.harvest
}), {
  getCatalog: get,
  getHarvest
})(CatalogHarvestPage)
