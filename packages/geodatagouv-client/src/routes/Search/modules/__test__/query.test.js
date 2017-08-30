import { parseQueryString, update } from '../query'

describe('Search.modules.query', () => {
  describe('parseQueryString', () => {
    it('should not fail when not specifying a query string', () => {
      expect(parseQueryString()).to.be.ok
    })

    it('should handle the ? in the query string', () => {
      const qs = parseQueryString('?')

      expect(qs).not.to.have.key('?')
    })

    it('should return an object with the specified query string parameters', () => {
      const qs = parseQueryString('?foo=bar&hello=hi')

      expect(qs).to.deep.equal({
        foo: 'bar',
        hello: 'hi'
      })
    })

    it('should return ordered arrays for duplicated keys', () => {
      const qs = parseQueryString('?foo=bar&foo=baz&hello=hi&hello=yo')

      expect(qs).to.deep.equal({
        foo: ['bar', 'baz'],
        hello: ['hi', 'yo']
      })
    })
  })

  describe('update', () => {
    it('should not fail when not specifying changes', () => {
      expect(update('')).to.be.ok
    })

    it('should not fail when not specifying a query', () => {
      expect(update()).to.be.ok
    })

    it('should set q when specifying it', () => {
      const newQuery = update('', { q: 'foo' })

      expect(newQuery.q).to.equal('foo')
    })

    it('should unset q when specifying an empty q', () => {
      const newQuery = update('?q=foo', { q: '' })

      expect(newQuery.q).to.be.undefined
    })

    it('should not change q, when not specifying it', () => {
      const newQuery = update('?q=foo', {})

      expect(newQuery.q).to.equal('foo')
    })

    it('should update q when specifying a new one', () => {
      const newQuery = update('?q=foo', { q: 'bar' })

      expect(newQuery.q).to.equal('bar')
    })

    it('should set the page when specified', () => {
      const newQuery = update('?q=foo', { page: 42 })

      expect(newQuery).to.deep.equal({
        q: 'foo',
        page: 42
      })
    })

    it('should strip the page when lower than 2', () => {
      [-42, -1, 0, 1].map(page => {
        const newQuery = update('?q=foo', { page })

        expect(newQuery).to.deep.equal({
          q: 'foo'
        })
      })
    })

    it('should strip the page when not specified', () => {
      const newQuery = update('?q=foo&page=15')

      expect(newQuery).to.deep.equal({
        q: 'foo'
      })
    })
  })
})
