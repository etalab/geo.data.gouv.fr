import { connect } from 'react-redux'

import SearchPage from '../components/SearchPage'

import { update } from '../modules/actions'
import { parse } from '../modules/query'

export default connect((state, ownProps) => ({
  search: state.search,
  query: parse(state.location.query)
}), {
  update
})(SearchPage)
