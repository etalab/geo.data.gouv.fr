import {
  CATALOGS_LIST_PENDING,
  CATALOGS_LIST_SUCCESS,
  CATALOGS_LIST_FAILURE
} from './constants'

const initialState = {
  list: {
    pending: false,
    error: false,
    catalogs: {}
  }
}

const handlers = {
  [CATALOGS_LIST_PENDING]: (state, action) => ({
    ...state,

    list: {
      pending: true,
      error: false
    }
  }),

  [CATALOGS_LIST_SUCCESS]: (state, action) => ({
    ...state,

    list: {
      pending: false,
      catalogs: action.payload,
      error: false
    }
  }),

  [CATALOGS_LIST_FAILURE]: (state, action) => ({
    ...state,

    list: {
      pending: false,
      error: action.error
    }
  })
}

export default function (state = initialState, action) {
  const handler = handlers[action.type]

  return handler ? handler(state, action) : state
}
