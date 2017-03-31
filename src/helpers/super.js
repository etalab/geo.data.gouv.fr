const DATAGOUV_APIKEY = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiNTg0ZTY4MWFjNzUxZGY1ZTlkYzBiYjdlIiwidGltZSI6MTQ5MDg4NzA1Ni43OTczMDZ9.u20YSniY59IFw6MgYQATmLCm3CW--vf3aYQ3HmpkTPA'

export function _fetch(url, method, data) {
  const options = {
    headers: {
      'Accept': 'application/json',
    },
    mode: 'cors',
    method: method || 'GET',
  }

  if (url.includes('https://inspire.data.gouv.fr/dgv/api')) {
    options.credentials = 'include'
  }

  if (url.includes('https://next.data.gouv.fr/api/1' && DATAGOUV_APIKEY)) {
    url = url.replace('www', 'next')
    options.headers = {
      'X-API-KEY': DATAGOUV_APIKEY
    }
  }

  if (data) {
    options.headers['Content-Type'] = 'application/json'
    options.body = JSON.stringify(data)
  }

  return fetch(url, options)
    .then(response => {
      if (response.status === 500) throw new Error('Internal Server Error')
      if (response.status === 401) throw new Error('Unauthorized')
      if (response.status === 404) throw new Error('Not found')
      if (response.status === 202) return
      if (response.status === 204) return
      return response.json()
    })
    .catch((err) => {
      throw err
    });
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
