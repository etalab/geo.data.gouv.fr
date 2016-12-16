import { computeFreshnessScore, isObsolete, computeOpenScore, computeDownloadableScore, computeCatalogScore } from '../catalogs'

describe('catalogs', function () {
  const refDate = new Date('2016-07-15')

  describe('computeFreshnessScore(moment)', function () {
    describe('moment is not defined', function () {
      it('should return 0', function () {
        expect(computeFreshnessScore(null, refDate)).to.equal(1)
      })
    })
    describe('moment is more recent than 1 month', function () {
      it('should return 100', function () {
        expect(computeFreshnessScore(new Date('2016-07-01'), refDate)).to.equal(100)
      })
    })
    describe('moment is more recent than 6 months', function () {
      it('should return 10', function () {
        expect(computeFreshnessScore(new Date('2016-05-01'), refDate)).to.equal(10)
      })
    })
    describe('moment is older than 6 months', function () {
      it('should return 0', function () {
        expect(computeFreshnessScore(new Date('2011-07-01'), refDate)).to.equal(1)
      })
    })
  })

  describe('isObsolete(catalog)', () => {
    describe('catalog has no mostRecentRevisionDate metric', () => {
      const catalog = {}
      it('should return undefined', function () {
        return expect(isObsolete(catalog, refDate)).to.be.undefined
      })
    })
    describe('mostRecentRevisionDate is more recent than 6 months', () => {
      const catalog = { metrics: { mostRecentRevisionDate: new Date('2016-06-01') } }
      it('should return false', function () {
        return expect(isObsolete(catalog, refDate)).to.be.false
      })
    })
    describe('mostRecentRevisionDate is older than 6 months', () => {
      const catalog = { metrics: { mostRecentRevisionDate: new Date('2011-06-01') } }
      it('should return true', function () {
        return expect(isObsolete(catalog, refDate)).to.be.true
      })
    })
  })

  describe('computeOpenScore(percentOpen)', () => {
    describe('percentOpen >= 100', () => {
      it('should return 100', () => {
        expect(computeOpenScore(500)).to.equal(100)
        expect(computeOpenScore(100)).to.equal(100)
      })
    })
    describe('percentOpen <= 1', () => {
      it('should return 1', () => {
        expect(computeOpenScore(-10)).to.equal(1)
        expect(computeOpenScore(0)).to.equal(1)
        expect(computeOpenScore(1)).to.equal(1)
      })
    })
    describe('1 < percentOpen < 100', () => {
      it('should return the same value', () => {
        expect(computeOpenScore(47)).to.equal(47)
      })
    })
  })

  describe('computeDownloadableScore(percentDownloadable)', () => {
    describe('percentDownloadable >= 100', () => {
      it('should return 100 * 100', () => {
        expect(computeDownloadableScore(500)).to.equal(100 * 100)
        expect(computeDownloadableScore(100)).to.equal(100 * 100)
      })
    })
    describe('percentDownloadable <= 1', () => {
      it('should return 1', () => {
        expect(computeDownloadableScore(-10)).to.equal(1)
        expect(computeDownloadableScore(0)).to.equal(1)
        expect(computeDownloadableScore(1)).to.equal(1)
      })
    })
    describe('1 < percentDownloadable < 100', () => {
      it('should return squared value', () => {
        expect(computeDownloadableScore(47)).to.equal(47 * 47)
      })
    })
  })

  describe('computeCatalogScore(catalog)', () => {
    describe('catalog with no metrics', () => {
      const catalog = {}
      it('should return 0', () => {
        expect(computeCatalogScore(catalog, refDate)).to.equal(0)
      })
    })

    describe('catalog with totalCount = 0', () => {
      const catalog = {
        metrics: {
          datasets: { totalCount: 0 }
        }
      }
      it('should return 0', () => {
        expect(computeCatalogScore(catalog, refDate)).to.equal(0)
      })
    })

    describe('perfect but old catalog', () => {
      const catalog = {
        metrics: {
          datasets: {
            totalCount: 1,
            partitions: {
              openness: { yes: 1 },
              download: { yes: 1 },
            }
          },
          mostRecentRevisionDate: new Date('2000-01-01')
        }
      }
      it('should return 0', () => {
        expect(computeCatalogScore(catalog, refDate)).to.equal(100 * (100 * 100) * 1)
      })
    })

    describe('recent but poor catalog', () => {
      const catalog = {
        metrics: {
          datasets: {
            totalCount: 100,
            partitions: {
              openness: { yes: 11 },
              download: { yes: 12 },
            }
          },
          mostRecentRevisionDate: new Date('2016-05-01')
        }
      }
      it('should return 0', () => {
        expect(computeCatalogScore(catalog, refDate)).to.equal(11 * (12 * 12) * 10)
      })
    })
  })

})
