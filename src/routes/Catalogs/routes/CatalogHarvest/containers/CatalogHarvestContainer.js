import { connect } from 'react-redux'

import CatalogHarvestPage from '../components/CatalogHarvestPage'

export default connect(state => ({
  catalog: state.catalog.catalog,
  harvest: state.catalog.harvest
}))(CatalogHarvestPage)
