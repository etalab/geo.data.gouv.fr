import { _get } from './fetch'

import { PUBLICATION_BASE_URL } from '@env'

const SESSION_KEY = 'dgv-session'

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
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
    } else {
      clearSession()
    }
  }

  return session
}

export const getSession = async ({ force = false }) => {
  let session

  if (!force) {
    try {
      session = JSON.parse(sessionStorage.getItem(SESSION_KEY))
    } catch (err) {
      clearSession()
    }
  }

  if (!session) {
    session = fetchUser()
  }

  return session
}

export const clearSession = () => sessionStorage.removeItem(SESSION_KEY)
