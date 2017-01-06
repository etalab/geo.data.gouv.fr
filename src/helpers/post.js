import superfetch from '../helpers/superfetch'

export function _post(url, params) {
  return superfetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(params)
  })
}
