import { connect } from 'react-redux'

import { getCatalogOrderByScore } from 'common/helpers/catalogs'

import CatalogsPage from '../components/CatalogsPage'

export default connect(state => ({
  catalogs: getCatalogOrderByScore(state.catalogs.list.catalogs),
  pending: state.catalogs.list.pending,
  error: state.catalogs.list.error
}))(CatalogsPage)
