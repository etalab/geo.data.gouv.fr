import { addFilter, removeFilter, replaceFilter, translateFilters, convertFilters, isActive } from '../manageFilters'

describe('manageFilters', () => {

  describe('translate', () => {
    describe('Known filter', () => {
      it('should translate filter', () => {
        const filter = 'availability'
        expect(translateFilters(filter)).to.equal('Téléchargeable')
      })
    })

    describe('Unknown filter', () => {
      it('should translate filter', () => {
        const filter = 'Improbable filter name'
        expect(translateFilters(filter)).to.equal(filter)
      })
    })
  })

  describe('addFilter()', () => {
    it('should add a new filter', () => {
      const filters = addFilter([], {name: 'test', value: 42})
      expect(filters).to.deep.equal([{name: 'test', value: 42}])
    })

    it('should add a new value to an existing filter', () => {
      let filters = addFilter([], {name: 'test', value: 42})
      filters = addFilter(filters, {name: 'test', value: 21})
      expect(filters).to.deep.equal([{name: 'test', value: 42}, {name: 'test', value:21}])
    })

    it('should not add an existing value', () => {
      let filters = addFilter([], {name: 'test', value: 42})
      filters = addFilter(filters, {name: 'test', value: 42})
      expect(filters).to.deep.equal([{name: 'test', value: 42}])
    })
  })

  describe('removeFilter()', () => {
    it('should remove a filter', () => {
      let filters = [{name: 'foo', value: 'bar'}, {name: 'test', value: 42}]
      filters = removeFilter(filters, {name: 'test', value: 42})
      expect(filters).to.deep.equal([{name: 'foo', value: 'bar'}])
    })

    it('should have no effect when filter does not exist', () => {
      const filters = removeFilter([], {name: 'test', value: 21})
      expect(filters).to.deep.equal([])
    })

    it('should have no effect when value does not exist', () => {
      const filter = [{name: 'test', value: 42}]
      const filters = removeFilter(filter, {name: 'test', value: 21})
      expect(filters).to.deep.equal(filter)
    })
  })

  describe('replaceFilter()', () => {
    it('should replace filter', () => {
      let filters = [{name: 'foo', value: 'bar'}, {name: 'test', value: 0}]

      filters = replaceFilter(filters, {name: 'test', value: 42})
      expect(filters).to.deep.equal([{name: 'foo', value: 'bar'}, {name: 'test', value: 42}])
    })

    it('should create when filter do not exist', () => {
      let filters = [{name: 'foo', value: 'bar'}]

      filters = replaceFilter(filters, {name: 'test', value: 42})
      expect(filters).to.deep.equal([{name: 'foo', value: 'bar'}, {name: 'test', value: 42}])
    })
  })

  describe('convertFilters()', () => {
    it('should return a query', () => {
      const filters = [
        {name: 'keywords', value: 'keyword1'},
        {name: 'keywords', value: 'keyword2'},
        {name: 'organizations', value: 'foo'},
      ]
      const convertedFilters = {
        keywords: ['keyword1', 'keyword2'],
        organizations: ['foo'],
      }
      const result = convertFilters(filters)

      expect(result).to.deep.equal(convertedFilters)
    })
  })

  describe('isActive()', () => {
    it('should return true', () => {
      const filter = {name: 'keywords', value: 'keyword1'}
      const filters = [{name: 'keywords', value: 'keyword1'}]

      const result = isActive(filters, filter)
      expect(result).to.deep.equal(true)
    })

    it('should return false', () => {
      const filter = {name: 'foo', value: 'bar'}
      const filters = [{name: 'keywords', value: 'keyword1'}]

      const result = isActive(filters, filter)
      expect(result).to.deep.equal(false)
    })
  })
})
