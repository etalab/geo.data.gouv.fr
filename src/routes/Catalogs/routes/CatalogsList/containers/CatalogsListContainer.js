import { connect } from 'react-redux'

import { getCatalogOrderByScore } from 'common/helpers/catalogs'

import CatalogsListPage from '../components/CatalogsListPage'

export default connect(state => ({
  catalogs: getCatalogOrderByScore(state.catalogs.catalogs),
  pending: state.catalogs.pending,
  error: state.catalogs.error
}))(CatalogsListPage)
