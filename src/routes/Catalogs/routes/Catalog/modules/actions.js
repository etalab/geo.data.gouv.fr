import { _get } from 'common/helpers/super'

import {
  CATALOGS_GET_PENDING,
  CATALOGS_GET_SUCCESS,
  CATALOGS_GET_FAILURE,

  CATALOGS_GET_METRICS_PENDING,
  CATALOGS_GET_METRICS_SUCCESS,
  CATALOGS_GET_METRICS_FAILURE
} from './constants'

const { INSPIRE_API_URL } = process.env

export const get = id => dispatch => {
  dispatch({
    type: CATALOGS_GET_PENDING
  })

  return _get(
    `${INSPIRE_API_URL}/catalogs/${id}`
  )
  .then(data => {
    dispatch({
      type: CATALOGS_GET_SUCCESS,
      payload: data
    })
  })
  .catch(err => {
    dispatch({
      type: CATALOGS_GET_FAILURE,
      error: err
    })
  })
}

export const getMetrics = id => dispatch => {
  dispatch({
    type: CATALOGS_GET_METRICS_PENDING
  })

  return _get(
    `${INSPIRE_API_URL}/catalogs/${id}/metrics`
  )
  .then(data => {
    dispatch({
      type: CATALOGS_GET_METRICS_SUCCESS,
      payload: data
    })
  })
  .catch(err => {
    dispatch({
      type: CATALOGS_GET_METRICS_FAILURE,
      error: err
    })
  })
}

