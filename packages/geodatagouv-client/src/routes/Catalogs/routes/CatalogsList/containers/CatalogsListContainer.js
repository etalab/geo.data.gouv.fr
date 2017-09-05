import { connect } from 'react-redux'

import { list } from '../modules/actions'

import CatalogsListPage from '../components/CatalogsListPage'

export default connect(({ catalogs }) => ({
  catalogs
}), {
  fetchCatalogs: list
})(CatalogsListPage)
