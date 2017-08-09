import qs from 'querystring'

import { _get } from 'common/helpers/super'

import { parse, flattenFilters } from './query'

import {
  SEARCH_EXECUTE_PENDING,
  SEARCH_EXECUTE_SUCCESS,
  SEARCH_EXECUTE_FAILURE
} from './constants'

const { INSPIRE_API_URL } = process.env

export const execute = (query, limit = 20) => dispatch => {
  const parsedQuery = parse(query)

  dispatch({
    type: SEARCH_EXECUTE_PENDING,
    parsedQuery
  })

  const filters = flattenFilters(parsedQuery.filters)

  return _get(
    `${INSPIRE_API_URL}/records?${qs.stringify({
      ...filters,
      q: parsedQuery.textInput,
      offset: (parsedQuery.page - 1) * limit,
      limit
    })}`
  )
    .then(data => {
      dispatch({
        type: SEARCH_EXECUTE_SUCCESS,
        payload: data
      })
    })
    .catch(err => {
      dispatch({
        type: SEARCH_EXECUTE_FAILURE,
        error: err
      })
    })
}
