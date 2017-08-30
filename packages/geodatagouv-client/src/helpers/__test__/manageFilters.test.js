import { translateFilters, convertFilters, isActive } from '../manageFilters'

describe('manageFilters', () => {
  describe('translate', () => {
    describe('Known filter', () => {
      it('should translate filter', () => {
        const filter = 'availability'
        expect(translateFilters(filter)).to.equal('téléchargeable')
      })
    })

    describe('Unknown filter', () => {
      it('should translate filter', () => {
        const filter = 'Improbable filter name'
        expect(translateFilters(filter)).to.equal(filter)
      })
    })
  })

  describe('convertFilters()', () => {
    it('should return a query', () => {
      const filters = [
        { name: 'keywords', value: 'keyword1' },
        { name: 'keywords', value: 'keyword2' },
        { name: 'organizations', value: 'foo' }
      ]
      const convertedFilters = {
        keywords: ['keyword1', 'keyword2'],
        organizations: ['foo']
      }
      const result = convertFilters(filters)

      expect(result).to.deep.equal(convertedFilters)
    })
  })

  describe('isActive()', () => {
    it('should return true', () => {
      const filter = { name: 'keywords', value: 'keyword1' }
      const filters = [{ name: 'keywords', value: 'keyword1' }]

      const result = isActive(filters, filter)
      expect(result).to.deep.equal(true)
    })

    it('should return false', () => {
      const filter = { name: 'foo', value: 'bar' }
      const filters = [{ name: 'keywords', value: 'keyword1' }]

      const result = isActive(filters, filter)
      expect(result).to.deep.equal(false)
    })
  })
})
