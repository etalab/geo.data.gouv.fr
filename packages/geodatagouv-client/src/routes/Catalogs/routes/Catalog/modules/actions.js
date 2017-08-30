import { _get, _post } from 'common/helpers/super'

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

export const getHarvests = id => dispatch => {
  dispatch({
    type: CATALOGS_GET_HARVESTS_PENDING
  })

  return _get(
    `${INSPIRE_API_URL}/services/${id}/synchronizations`
  )
    .then(data => {
      dispatch({
        type: CATALOGS_GET_HARVESTS_SUCCESS,
        payload: data
      })
    })
    .catch(err => {
      dispatch({
        type: CATALOGS_GET_HARVESTS_FAILURE,
        error: err
      })
    })
}

export const syncCatalog = id => dispatch => {
  dispatch({
    type: CATALOGS_SYNC_PENDING
  })

  return _post(
    `${INSPIRE_API_URL}/services/${id}/sync`
  )
    .then(data => {
      dispatch({
        type: CATALOGS_SYNC_SUCCESS,
        payload: data
      })
    })
    .catch(err => {
      dispatch({
        type: CATALOGS_SYNC_FAILURE,
        error: err
      })
    })
}

export const getHarvest = (catalogId, harvestId) => dispatch => {
  dispatch({
    type: HARVESTS_GET_PENDING
  })

  return _get(
    `${INSPIRE_API_URL}/services/${catalogId}/synchronizations/${harvestId}`
  )
    .then(data => {
      dispatch({
        type: HARVESTS_GET_SUCCESS,
        payload: data
      })
    })
    .catch(err => {
      dispatch({
        type: HARVESTS_GET_FAILURE,
        error: err
      })
    })
}
