import {
  CATALOGS_LIST_PENDING,
  CATALOGS_LIST_SUCCESS,
  CATALOGS_LIST_FAILURE
} from './constants'

import { getCatalogOrderByScore } from 'common/helpers/catalogs'

const initialState = {
  pending: false,
  error: false,
  catalogs: []
}

const handlers = {
  [CATALOGS_LIST_PENDING]: (state, action) => ({
    ...state,

    pending: true,
    error: false
  }),

  [CATALOGS_LIST_SUCCESS]: (state, action) => ({
    ...state,

    pending: false,
    catalogs: getCatalogOrderByScore(action.payload),
    error: false
  }),

  [CATALOGS_LIST_FAILURE]: (state, action) => ({
    ...state,

    pending: false,
    error: action.error
  })
}

export default function (state = initialState, action) {
  const handler = handlers[action.type]

  return handler ? handler(state, action) : state
}
