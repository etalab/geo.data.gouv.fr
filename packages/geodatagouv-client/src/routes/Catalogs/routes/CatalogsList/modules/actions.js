import { _get } from 'common/helpers/super'

import {
  CATALOGS_LIST_PENDING,
  CATALOGS_LIST_SUCCESS,
  CATALOGS_LIST_FAILURE
} from './constants'

const { INSPIRE_API_URL } = process.env

export const list = () => dispatch => {
  dispatch({
    type: CATALOGS_LIST_PENDING
  })

  return _get(
    `${INSPIRE_API_URL}/catalogs`
  )
    .then(data => {
      dispatch({
        type: CATALOGS_LIST_SUCCESS,
        payload: data
      })
    })
    .catch(err => {
      dispatch({
        type: CATALOGS_LIST_FAILURE,
        error: err
      })
    })
}
