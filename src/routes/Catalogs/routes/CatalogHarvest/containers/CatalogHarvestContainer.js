import { connect } from 'react-redux'

import CatalogHarvestPage from '../components/CatalogHarvestPage'

export default connect(state => ({
  catalog: state.catalog,
  harvest: state.catalog.harvest
}))(CatalogHarvestPage)
