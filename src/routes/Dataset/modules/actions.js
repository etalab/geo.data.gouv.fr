import { _get } from 'common/helpers/super'

import {
  DATASETS_GET_PENDING,
  DATASETS_GET_SUCCESS,
  DATASETS_GET_FAILURE,

  DATASETS_GET_PUBLICATION_PENDING,
  DATASETS_GET_PUBLICATION_SUCCESS,
  DATASETS_GET_PUBLICATION_FAILURE,

  DATASETS_DATA_GOUV_GET_PENDING,
  DATASETS_DATA_GOUV_GET_SUCCESS,
  DATASETS_DATA_GOUV_GET_FAILURE
} from './constants'

const { INSPIRE_API_URL, PROXY_API_URL } = process.env

export const get = id => dispatch => {
  dispatch({
    type: DATASETS_GET_PENDING
  })

  return _get(
    `${INSPIRE_API_URL}/records/${id}`
  )
  .then(data => {
    dispatch({
      type: DATASETS_GET_SUCCESS,
      payload: data
    })
  })
  .catch(err => {
    dispatch({
      type: DATASETS_GET_FAILURE,
      error: err
    })
  })
}

export const getPublication = id => dispatch => {
  dispatch({
    type: DATASETS_GET_PUBLICATION_PENDING
  })

  return _get(
    `${INSPIRE_API_URL}/records/${id}/publications`
  )
  .then(data => {
    dispatch({
      type: DATASETS_GET_PUBLICATION_SUCCESS,
      payload: data.find(pub => pub.target === 'dgv')
    })
  })
  .catch(err => {
    dispatch({
      type: DATASETS_GET_PUBLICATION_FAILURE,
      error: err
    })
  })
}

export const getOnDataGouv = id => dispatch => {
  dispatch({
    type: DATASETS_DATA_GOUV_GET_PENDING
  })

  return _get(
    `${PROXY_API_URL}/datasets/${id}`
  )
  .then(data => {
    dispatch({
      type: DATASETS_DATA_GOUV_GET_SUCCESS,
      payload: data
    })
  })
  .catch(err => {
    dispatch({
      type: DATASETS_DATA_GOUV_GET_FAILURE,
      error: err
    })
  })
}
