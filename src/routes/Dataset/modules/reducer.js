import {
  DATASETS_GET_PENDING,
  DATASETS_GET_SUCCESS,
  DATASETS_GET_FAILURE
} from './constants'

const initialState = {
  dataset: {
    pending: false,
    error: false,
    dataset: null
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
  })
}

export default function (state = initialState, action) {
  const handler = handlers[action.type]

  return handler ? handler(state, action) : state
}
