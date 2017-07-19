import {
  CATALOGS_GET_PENDING,
  CATALOGS_GET_SUCCESS,
  CATALOGS_GET_FAILURE,

  CATALOGS_GET_METRICS_PENDING,
  CATALOGS_GET_METRICS_SUCCESS,
  CATALOGS_GET_METRICS_FAILURE
} from './constants'

const initialState = {
  pending: false,
  error: false,
  catalog: null,

  metrics: {
    pending: false,
    error: false,
    metrics: null
  }
}

const handlers = {
  // CATALOGS_GET
  // ------------------------------------
  [CATALOGS_GET_PENDING]: (state, action) => ({
    ...state,

    pending: true,
    error: false
  }),

  [CATALOGS_GET_SUCCESS]: (state, action) => ({
    ...state,

    pending: false,
    catalog: action.payload,
    error: false
  }),

  [CATALOGS_GET_FAILURE]: (state, action) => ({
    ...state,

    pending: false,
    error: action.error
  }),


  // CATALOGS_GET_METRICS
  // ------------------------------------
  [CATALOGS_GET_METRICS_PENDING]: (state, action) => ({
    ...state,

    metrics: {
      ...state.metrics,

      pending: true,
      error: false
    }
  }),

  [CATALOGS_GET_METRICS_SUCCESS]: (state, action) => ({
    ...state,

    metrics: {
      ...state.metrics,

      pending: false,
      metrics: action.payload,
      error: false
    }
  }),

  [CATALOGS_GET_METRICS_FAILURE]: (state, action) => ({
    ...state,

    metrics: {
      ...state.metrics,

      pending: false,
      error: action.error
    }
  })
}

export default function (state = initialState, action) {
  const handler = handlers[action.type]

  return handler ? handler(state, action) : state
}
