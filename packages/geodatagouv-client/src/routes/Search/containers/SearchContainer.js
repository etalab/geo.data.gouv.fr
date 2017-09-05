import { connect } from 'react-redux'

import SearchPage from '../components/SearchPage'

import { execute } from '../modules/actions'
import { update } from '../modules/query'

export default connect(({ search }) => ({
  search,
  updateQuery: update
}), {
  execute
})(SearchPage)
