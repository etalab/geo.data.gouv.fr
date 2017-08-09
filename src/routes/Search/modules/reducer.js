import {
  SEARCH_EXECUTE_PENDING,
  SEARCH_EXECUTE_SUCCESS,
  SEARCH_EXECUTE_FAILURE
} from './constants'

const initialState = {
  pending: false,
  error: false,
  parsedQuery: {
    filters: [],
    page: 1
  },
  search: {
    facets: {},
    query: {
      facets: []
    },
    results: [],
    count: 0
  }
}

const handlers = {
  [SEARCH_EXECUTE_PENDING]: (state, action) => ({
    ...state,

    pending: true,
    error: false,
    parsedQuery: action.parsedQuery
  }),

  [SEARCH_EXECUTE_SUCCESS]: (state, action) => ({
    ...state,

    pending: false,
    search: action.payload,
    error: false
  }),

  [SEARCH_EXECUTE_FAILURE]: (state, action) => ({
    ...state,

    pending: false,
    error: action.error
  })
}

export default function (state = initialState, action) {
  const handler = handlers[action.type]

  return handler ? handler(state, action) : state
}
