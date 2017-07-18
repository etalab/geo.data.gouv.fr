import {
  SEARCH_EXECUTE_PENDING,
  SEARCH_EXECUTE_SUCCESS,
  SEARCH_EXECUTE_FAILURE
} from './constants'

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
  [SEARCH_EXECUTE_PENDING]: (state, action) => ({
    ...state,

    pending: true,
    error: false
  }),

  [SEARCH_EXECUTE_SUCCESS]: (state, action) => ({
    ...state,

    pending: false,
    facets: action.payload.facets,
    results: action.payload.results,
    count: action.payload.count,
    query: action.payload.query,
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
