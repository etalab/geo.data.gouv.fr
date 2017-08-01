import { isWarningStatus } from '../status'

describe('status()', () => {
  describe('isWarningStatus()', () => {
    it('should return true whan status exist and has consequences', () => {
      const status = 'obsolete'
      expect(isWarningStatus(status)).to.be.true
    })

    it('should return false when status exist but has no consequences', () => {
      const status = 'completed'
      expect(isWarningStatus(status)).to.be.false
    })

    it('should return false when status do not exist', () => {
      const status = 'lol'
      expect(isWarningStatus(status)).to.be.false
    })

    it('should return false when status is not defined', () => {
      const status = undefined
      expect(isWarningStatus(status)).to.be.false
    })
  })
})
