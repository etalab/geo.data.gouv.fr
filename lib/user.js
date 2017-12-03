import { _get } from './fetch'

import { PUBLICATION_BASE_URL } from '@env'

const USER_KEY = 'dgv-user'

export const fetchUser = async () => {
  let user

  try {
    user = await _get(`${PUBLICATION_BASE_URL}/api/me`)
    sessionStorage.setItem(USER_KEY, JSON.stringify(user))
  } catch (err) {
    clearUser()
  }

  return user
}

export const getUser = async () => {
  let user

  try {
    user = JSON.parse(sessionStorage.getItem(USER_KEY))
  } catch (err) {
    clearUser()
  }

  if (!user) {
    user = fetchUser()
  }

  return user
}

export const clearUser = () => sessionStorage.removeItem(USER_KEY)
