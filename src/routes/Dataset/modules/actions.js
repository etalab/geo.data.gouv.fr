import { _get } from 'common/helpers/super'

import {
  DATASETS_GET_PENDING,
  DATASETS_GET_SUCCESS,
  DATASETS_GET_FAILURE
} from './constants'

const { INSPIRE_API_URL } = process.env

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
