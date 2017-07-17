import {
  SEARCH_EXECUTE_PENDING,
  SEARCH_EXECUTE_SUCCESS,
  SEARCH_EXECUTE_FAILURE
} from '../constants'

import * as execute from './execute'

const initialState = {
  pending: false,
  error: false,
  facets: {},
  query: {
    facets: []
  },
  results: [],
  count: 0
}

const handlers = {
  [SEARCH_EXECUTE_PENDING]: execute.pending,
  [SEARCH_EXECUTE_SUCCESS]: execute.success,
  [SEARCH_EXECUTE_FAILURE]: execute.failure
}

export default function (state = initialState, action) {
  const handler = handlers[action.type]

  return handler ? handler(state, action) : state
}
