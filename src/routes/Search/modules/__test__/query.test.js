import { update } from '../query'

describe('Search.modules.query', () => {
  describe('update', () => {
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
  })
})
