import moment from 'moment'

import { isObsolete, findCandidates, computeScore } from '../../lib/catalog'

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

describe('computeScore', () => {
  test('return 0 for a catalog with no metrics', () => {
    expect(computeScore({})).toBe(0)
  })

  test('return 0 for a catalog with no data', () => {
    const catalog = {
      metrics: {
        datasets: {
          partitions: {
            openness: { yes: 1 },
            download: { yes: 1 }
          }
        }
      }
    }

    expect(computeScore(catalog)).toBe(0)
  })

  test('return score for a perfect but old catalog', () => {
    const catalog = {
      metrics: {
        datasets: {
          totalCount: 42,
          partitions: {
            openness: { yes: 42 },
            download: { yes: 42 }
          }
        }
      }
    }

    expect(computeScore(catalog)).toBe(100 * 100 * 100)
  })

  test('return score for a perfect catalog that was updated in the last 6 months', () => {
    const catalog = {
      metrics: {
        mostRecentRevisionDate: moment().subtract(2, 'months').toDate(),
        datasets: {
          totalCount: 42,
          partitions: {
            openness: { yes: 42 },
            download: { yes: 42 }
          }
        }
      }
    }

    expect(computeScore(catalog)).toBe(100 * 100 * 100 * 10)
  })

  test('return score for a perfect catalog that was updated in the last month', () => {
    const catalog = {
      metrics: {
        mostRecentRevisionDate: moment().subtract(10, 'days').toDate(),
        datasets: {
          totalCount: 42,
          partitions: {
            openness: { yes: 42 },
            download: { yes: 42 }
          }
        }
      }
    }

    expect(computeScore(catalog)).toBe(100 * 100 * 100 * 100)
  })

  test('return score for a catalog that is not completely open', () => {
    const catalog = {
      metrics: {
        mostRecentRevisionDate: moment().subtract(10, 'days').toDate(),
        datasets: {
          totalCount: 10,
          partitions: {
            openness: { yes: 5 },
            download: { yes: 10 }
          }
        }
      }
    }

    expect(computeScore(catalog)).toBe(50 * 100 * 100 * 100)
  })

  test('return score for a catalog that is not completely downloadable', () => {
    const catalog = {
      metrics: {
        mostRecentRevisionDate: moment().subtract(10, 'days').toDate(),
        datasets: {
          totalCount: 10,
          partitions: {
            openness: { yes: 10 },
            download: { yes: 5 }
          }
        }
      }
    }

    expect(computeScore(catalog)).toBe(100 * 50 * 50 * 100)
  })
})
