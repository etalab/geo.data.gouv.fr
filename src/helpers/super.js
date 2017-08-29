const { DATAGOUV_API_URL, DATAGOUV_API_KEY, PUBLICATION_API_URL } = process.env

export function _fetch(url, method, data) {
  const options = {
    headers: {
      'Accept': 'application/json'
    },
    mode: 'cors',
    method: method || 'GET'
  }

  if (url.includes(PUBLICATION_API_URL)) {
    options.credentials = 'include'
  }

  if (url.startsWith(DATAGOUV_API_URL)) {
    if (DATAGOUV_API_KEY) {
      options.headers['X-API-KEY'] = DATAGOUV_API_KEY
      options.mode = undefined
    } else {
      options.credentials = 'include'
    }
  }

  if (data) {
    options.headers['Content-Type'] = 'application/json'
    options.body = JSON.stringify(data)
  }

  return fetch(url, options).then(response => {
    if (response.status === 500) throw new Error('Internal Server Error')
    if (response.status === 401) throw new Error('Unauthorized')
    if (response.status === 404) throw new Error('Not found')
    if (response.status === 202) return
    if (response.status === 204) return
    return response.json()
  })
}

export function _get(url) {
  return _fetch(url)
}

export function _put(url, data) {
  return _fetch(url, 'PUT', data)
}

export function _post(url, data) {
  return _fetch(url, 'POST', data)
}

export function _delete(url) {
  return _fetch(url, 'DELETE')
}
