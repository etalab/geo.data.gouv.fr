import {
  DATASETS_GET_PENDING,
  DATASETS_GET_SUCCESS,
  DATASETS_GET_FAILURE,

  DATASETS_GET_PUBLICATION_PENDING,
  DATASETS_GET_PUBLICATION_SUCCESS,
  DATASETS_GET_PUBLICATION_FAILURE,

  DATASETS_DATA_GOUV_GET_PENDING,
  DATASETS_DATA_GOUV_GET_SUCCESS,
  DATASETS_DATA_GOUV_GET_FAILURE,

  DATASETS_FETCH_GEOJSON_PENDING,
  DATASETS_FETCH_GEOJSON_SUCCESS,
  DATASETS_FETCH_GEOJSON_FAILURE
} from './constants'

const initialState = {
  dataset: {
    pending: false,
    error: false,
    dataset: null
  },

  publication: {
    pending: false,
    error: false,
    publication: null
  },

  dataGouvDataset: {
    pending: false,
    error: false,
    dataset: null
  },

  geoJson: {
    pending: false,
    error: false,
    data: null
  }
}

const handlers = {
  // DATASETS_GET
  // ------------------------------------
  [DATASETS_GET_PENDING]: (state, action) => ({
    ...state,

    dataset: {
      ...state.dataset,

      pending: true,
      error: false
    }
  }),

  [DATASETS_GET_SUCCESS]: (state, action) => ({
    ...state,

    dataset: {
      ...state.dataset,

      pending: false,
      dataset: action.payload,
      error: false
    }
  }),

  [DATASETS_GET_FAILURE]: (state, action) => ({
    ...state,

    dataset: {
      ...state.dataset,

      pending: false,
      error: action.error
    }
  }),

  // DATASETS_GET_PUBLICATION
  // ------------------------------------
  [DATASETS_GET_PUBLICATION_PENDING]: (state, action) => ({
    ...state,

    publication: {
      ...state.publication,

      pending: true,
      error: false
    }
  }),

  [DATASETS_GET_PUBLICATION_SUCCESS]: (state, action) => ({
    ...state,

    publication: {
      ...state.publication,

      pending: false,
      publication: action.payload,
      error: false
    }
  }),

  [DATASETS_GET_PUBLICATION_FAILURE]: (state, action) => ({
    ...state,

    publication: {
      ...state.publication,

      pending: false,
      error: action.error
    }
  }),

  // DATASETS_DATA_GOUV_GET
  // ------------------------------------
  [DATASETS_DATA_GOUV_GET_PENDING]: (state, action) => ({
    ...state,

    dataGouvDataset: {
      ...state.dataGouvDataset,

      pending: true,
      error: false
    }
  }),

  [DATASETS_DATA_GOUV_GET_SUCCESS]: (state, action) => ({
    ...state,

    dataGouvDataset: {
      ...state.dataGouvDataset,

      pending: false,
      dataset: action.payload,
      error: false
    }
  }),

  [DATASETS_DATA_GOUV_GET_FAILURE]: (state, action) => ({
    ...state,

    dataGouvDataset: {
      ...state.dataGouvDataset,

      pending: false,
      error: action.error
    }
  }),

  // DATASETS_FETCH_GEOJSON
  // ------------------------------------
  [DATASETS_FETCH_GEOJSON_PENDING]: (state, action) => ({
    ...state,

    geoJson: {
      ...state.geoJson,

      pending: true,
      error: false
    }
  }),

  [DATASETS_FETCH_GEOJSON_SUCCESS]: (state, action) => ({
    ...state,

    geoJson: {
      ...state.geoJson,

      pending: false,
      data: action.payload,
      error: false
    }
  }),

  [DATASETS_FETCH_GEOJSON_FAILURE]: (state, action) => ({
    ...state,

    geoJson: {
      ...state.geoJson,

      pending: false,
      error: action.error
    }
  })
}

export default function (state = initialState, action) {
  const handler = handlers[action.type]

  return handler ? handler(state, action) : state
}
