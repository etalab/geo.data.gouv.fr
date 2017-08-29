import {
  CATALOGS_GET_PENDING,
  CATALOGS_GET_SUCCESS,
  CATALOGS_GET_FAILURE,

  CATALOGS_GET_METRICS_PENDING,
  CATALOGS_GET_METRICS_SUCCESS,
  CATALOGS_GET_METRICS_FAILURE,

  CATALOGS_GET_HARVESTS_PENDING,
  CATALOGS_GET_HARVESTS_SUCCESS,
  CATALOGS_GET_HARVESTS_FAILURE,

  CATALOGS_SYNC_PENDING,
  CATALOGS_SYNC_SUCCESS,
  CATALOGS_SYNC_FAILURE,

  HARVESTS_GET_PENDING,
  HARVESTS_GET_SUCCESS,
  HARVESTS_GET_FAILURE
} from './constants'

const initialState = {
  catalog: {
    pending: false,
    error: false,
    catalog: null
  },

  metrics: {
    pending: false,
    error: false,
    metrics: null
  },

  harvests: {
    pending: false,
    error: false,
    harvests: []
  },

  harvest: {
    pending: false,
    error: false,
    harvest: null
  }
}

const handlers = {
  // CATALOGS_GET
  // ------------------------------------
  [CATALOGS_GET_PENDING]: (state, action) => ({
    ...state,

    catalog: {
      ...state.catalog,

      pending: true,
      error: false
    }
  }),

  [CATALOGS_GET_SUCCESS]: (state, action) => ({
    ...state,

    catalog: {
      ...state.catalog,

      pending: false,
      catalog: action.payload,
      error: false
    }
  }),

  [CATALOGS_GET_FAILURE]: (state, action) => ({
    ...state,

    catalog: {
      ...state.catalog,

      pending: false,
      error: action.error
    }
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
  }),

  // CATALOGS_GET_HARVESTS
  // ------------------------------------
  [CATALOGS_GET_HARVESTS_PENDING]: (state, action) => ({
    ...state,

    harvests: {
      ...state.harvests,

      pending: true,
      error: false
    }
  }),

  [CATALOGS_GET_HARVESTS_SUCCESS]: (state, action) => ({
    ...state,

    harvests: {
      ...state.harvests,

      pending: false,
      harvests: action.payload,
      error: false
    }
  }),

  [CATALOGS_GET_HARVESTS_FAILURE]: (state, action) => ({
    ...state,

    harvests: {
      ...state.harvests,

      pending: false,
      error: action.error
    }
  }),

  // CATALOGS_SYNC
  // ------------------------------------
  [CATALOGS_SYNC_PENDING]: (state, action) => state,
  [CATALOGS_SYNC_SUCCESS]: (state, action) => ({
    ...state,

    catalog: {
      ...state.catalog,

      catalog: {
        ...state.catalog.catalog,

        service: {
          ...state.catalog.catalog.service,

          sync: {
            ...state.catalog.catalog.service.sync,

            pending: true
          }
        }
      }
    }
  }),
  [CATALOGS_SYNC_FAILURE]: (state, action) => state,

  // HARVESTS_GET
  // ------------------------------------
  [HARVESTS_GET_PENDING]: (state, action) => ({
    ...state,

    harvest: {
      ...state.harvest,

      pending: true,
      error: false
    }
  }),
  [HARVESTS_GET_SUCCESS]: (state, action) => ({
    ...state,

    harvest: {
      ...state.harvest,

      pending: false,
      harvest: action.payload
    }
  }),
  [HARVESTS_GET_FAILURE]: (state, action) => ({
    ...state,

    harvest: {
      ...state.harvest,

      pending: false,
      error: action.error
    }
  })
}

export default function (state = initialState, action) {
  const handler = handlers[action.type]

  return handler ? handler(state, action) : state
}
