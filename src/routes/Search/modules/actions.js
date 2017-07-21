import qs from 'querystring'
import { browserHistory } from 'react-router'

import { _get } from 'common/helpers/super'

import { flattenFilters } from './query'

import {
  SEARCH_EXECUTE_PENDING,
  SEARCH_EXECUTE_SUCCESS,
  SEARCH_EXECUTE_FAILURE
} from './constants'

const { INSPIRE_API_URL } = process.env

export const execute = (query, limit = 20) => dispatch => {
  dispatch({
    type: SEARCH_EXECUTE_PENDING
  })

  const filters = flattenFilters(query.filters)

  return _get(
    `${INSPIRE_API_URL}/records?${qs.stringify({
      ...filters,
      q: query.textInput,
      offset: (query.page - 1) * limit,
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

export const update = changes => {
  return (dispatch, getState) => {
    const location = { ...getState().location }
    const { q: iq, page: ipages, ...filters } = location.query

    const q = changes.q === undefined ? iq : changes.q
    const page = changes.page || ipages

    const query = {
      ...(q ? { q } : {}),

      ...(page && page > 1 ? { page } : {}),

      ...(changes.filters ? flattenFilters(changes.filters) : filters)
    }

    location.pathname = '/search'
    location.query = query

    browserHistory.push(location)
  }
}
