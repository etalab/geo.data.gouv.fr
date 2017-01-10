import { getUnrelated, getRelatedToOther } from '../producers'

describe('producers', function () {

  describe('getUnrelated(producers)', function () {
    it('should return an array of unrelated producers', () => {
      const relatedProducer = {_id: 'relatedProducer', associatedTo: '1'}
      const unrelatedProducer = {_id: 'unrelatedProducer'}
      const producers = [relatedProducer, unrelatedProducer]

      expect(getUnrelated(producers)).to.eql([unrelatedProducer])
    })
  })

  describe('getRelatedToOther(producers, organizationId)', () => {
    it('should return an array of producers related to others organizations', () => {
      const relatedToOtherProducer = {_id: 'relatedToOtherProducer', associatedTo: 42}
      const relatedProducer = {_id: 'relatedProducer', associatedTo: 1}
      const unrelatedProducer = {_id: 'unrelatedProducer'}
      const producers = [relatedToOtherProducer, relatedProducer, unrelatedProducer]

      expect(getRelatedToOther(producers, 1)).to.eql([relatedToOtherProducer])
    })
  })
})
