import { storeSession, retrieveSession, clearSession } from '../../lib/session'

afterAll(() => {
  clearSession()
})

describe('storeSession', () => {
  test('store session in sessionStorage', () => {
    const session = {
      foo: 'bar'
    }

    storeSession(session)

    expect(sessionStorage['geo-dgv-session']).toBe(JSON.stringify(session))
  })
})

describe('retrieveSession', () => {
  test('retrieve session from sessionStorage', () => {
    const session = {
      foo: 'bar'
    }

    storeSession(session)

    expect(retrieveSession()).toEqual(session)
  })
})

describe('clearSession', () => {
  test('clear session from sessionStorage', () => {
    storeSession({
      foo: 'bar'
    })
    clearSession()

    expect(sessionStorage['geo-dgv-session']).toBe(undefined)
  })
})
