import { isObsolete, findCandidates } from '../../lib/catalog'

describe('isObsolete', () => {
  test('return false if catalog is not defined', () => {
    expect(isObsolete()).toBe(false)
  })

  test('return false if mostRecentRevisionDate is not defined', () => {
    expect(isObsolete({
      metrics: {}
    })).toBe(false)
  })

  test('return false if mostRecentRevisionDate is invalid', () => {
    expect(isObsolete({
      metrics: {
        mostRecentRevisionDate: 'not a valid date'
      }
    })).toBe(false)
  })

  test('return true if mostRecentRevisionDate is too old', () => {
    expect(isObsolete({
      metrics: {
        mostRecentRevisionDate: new Date(2000, 0, 1)
      }
    })).toBe(true)
  })

  test('return false if mostRecentRevisionDate is recent', () => {
    expect(isObsolete({
      metrics: {
        mostRecentRevisionDate: new Date()
      }
    })).toBe(false)
  })

  test('work with strings', () => {
    expect(isObsolete({
      metrics: {
        mostRecentRevisionDate: new Date().toISOString()
      }
    })).toBe(false)
  })
})

describe('findCandidates', () => {
  test('ignore catalogs without open or download data', () => {
    const catalogs = [{}, {}, {}]

    expect(findCandidates(catalogs).length).toBe(0)
  })

  test('excludes catalogs with just open data', () => {
    const catalogs = [{}, {
      metrics: {
        datasets: {
          partitions: { openness: { yes: 1 } }
        }
      }
    }, {}]

    expect(findCandidates(catalogs).length).toBe(0)
  })

  test('excludes catalogs with just download data', () => {
    const catalogs = [{}, {
      metrics: {
        datasets: {
          partitions: { download: { yes: 1 } }
        }
      }
    }, {}]

    expect(findCandidates(catalogs).length).toBe(0)
  })

  test('include catalogs with download and open data', () => {
    const catalogs = [{}, {
      metrics: {
        datasets: {
          partitions: {
            openness: { yes: 1 },
            download: { yes: 1 }
          }
        }
      }
    }, {}]

    expect(findCandidates(catalogs).length).toBe(1)
  })

  test('exclude blacklisted catalogs', () => {
    const catalogs = [{
      id: 1,
      metrics: {
        datasets: {
          partitions: {
            openness: { yes: 1 },
            download: { yes: 1 }
          }
        }
      }
    }, {
      id: 2,
      metrics: {
        datasets: {
          partitions: {
            openness: { yes: 1 },
            download: { yes: 1 }
          }
        }
      }
    }, {}]

    const candidates = findCandidates(catalogs, [1])
    expect(candidates.length).toBe(1)
    expect(candidates[0].id).toBe(2)
  })
})
