import { getRelated, getUnrelated, getRelatedToOther } from '../producers'

describe('producers', function () {
  const relatedToOtherProducer = { _id: 'relatedToOtherProducer', associatedTo: 42 }
  const relatedProducer = { _id: 'relatedProducer', associatedTo: 1 }
  const unrelatedProducer = { _id: 'unrelatedProducer' }
  const producers = [relatedToOtherProducer, relatedProducer, unrelatedProducer]

  describe('getRelated(producers, organizationId)', function () {
    it('should return an array of related producers', () => {
      expect(getRelated(producers, 1)).to.eql([relatedProducer])
    })
  })

  describe('getUnrelated(producers)', function () {
    it('should return an array of unrelated producers', () => {
      expect(getUnrelated(producers)).to.eql([unrelatedProducer])
    })
  })

  describe('getRelatedToOther(producers, organizationId)', () => {
    it('should return an array of producers related to others organizations', () => {
      expect(getRelatedToOther(producers, 1)).to.eql([relatedToOtherProducer])
    })
  })
})
