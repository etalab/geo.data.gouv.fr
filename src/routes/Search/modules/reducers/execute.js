export const pending = (state, action) => ({
  ...state,

  pending: true,
  error: false
})

export const success = (state, action) => ({
  ...state,

  pending: false,
  facets: action.payload.facets,
  results: action.payload.results,
  count: action.payload.count,
  query: action.payload.query,
  error: false
})

export const failure = (state, action) => ({
  ...state,

  pending: false,
  error: action.error
})
