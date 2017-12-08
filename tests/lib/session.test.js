import { storeSession, retrieveSession, clearSession } from '../../lib/session'

afterAll(() => {
  clearSession()
})

test('store session in sessionStorage', () => {
  const session = {
    foo: 'bar'
  }

  storeSession(session)

  expect(sessionStorage['dgv-session']).toBe(JSON.stringify(session))
})

test('clear session from sessionStorage', () => {
  storeSession({
    foo: 'bar'
  })
  clearSession()

  expect(sessionStorage['dgv-session']).toBe(undefined)
})

test('retrieve session from sessionStorage', () => {
  const session = {
    foo: 'bar'
  }

  storeSession(session)

  expect(retrieveSession()).toEqual(session)
})
