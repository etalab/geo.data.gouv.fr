import superfetch from '../helpers/superfetch'

export function _put(url, params) {
  return superfetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(params)
  })
}
