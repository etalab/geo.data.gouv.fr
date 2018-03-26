import 'isomorphic-unfetch' // eslint-disable-line import/no-unassigned-import

import {DATAGOUV_API_URL, DATAGOUV_API_KEY, PUBLICATION_BASE_URL} from '@env'

class HttpError extends Error {
  constructor(response) {
    super(response.statusText)

    this.name = 'HttpError'
    this.code = response.status
    this.url = response.url
  }
}

export async function _fetch(url, method, data) {
  const options = {
    headers: {
      Accept: 'application/json'
    },
    mode: 'cors',
    method: method || 'GET'
  }

  if (url.includes(PUBLICATION_BASE_URL + '/api')) {
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

  const response = await fetch(url, options)

  if (!response.ok) {
    throw new HttpError(response)
  }

  return response.json()
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
