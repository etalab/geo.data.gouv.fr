import {_get} from './fetch'

import {PUBLICATION_BASE_URL} from '@env'

const SESSION_KEY = 'geo-dgv-session'

export const storeSession = session => sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))

export const retrieveSession = () => JSON.parse(sessionStorage.getItem(SESSION_KEY))

export const clearSession = () => sessionStorage.removeItem(SESSION_KEY)

export const fetchUser = async () => {
  let session

  try {
    session = {
      user: await _get(`${PUBLICATION_BASE_URL}/api/me`),
      auth: true
    }
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
  } catch (err) {
    if (err.code === 401) {
      session = {
        auth: false
      }

      storeSession(session)
    } else {
      clearSession()
    }
  }

  return session
}

export const getSession = async ({force = false}) => {
  let session

  if (!force) {
    try {
      session = retrieveSession()
    } catch (err) {
      clearSession()
    }
  }

  if (!session) {
    session = fetchUser()
  }

  return session
}
