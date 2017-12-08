import { isObsolete } from '../../lib/catalog'

test('isObsolete should return false if catalog is not defined', () => {
  expect(isObsolete()).toBe(false)
})

test('isObsolete should return false if mostRecentRevisionDate is not defined', () => {
  expect(isObsolete({
    metrics: {}
  })).toBe(false)
})

test('isObsolete should return false if mostRecentRevisionDate is invalid', () => {
  expect(isObsolete({
    metrics: {
      mostRecentRevisionDate: 'not a valid date'
    }
  })).toBe(false)
})

test('isObsolete should return true if mostRecentRevisionDate is too old', () => {
  expect(isObsolete({
    metrics: {
      mostRecentRevisionDate: new Date(2000, 0, 1)
    }
  })).toBe(true)
})

test('isObsolete should return false if mostRecentRevisionDate is recent', () => {
  expect(isObsolete({
    metrics: {
      mostRecentRevisionDate: new Date()
    }
  })).toBe(false)
})

test('isObsolete should also work with strings', () => {
  expect(isObsolete({
    metrics: {
      mostRecentRevisionDate: new Date().toISOString()
    }
  })).toBe(false)
})
