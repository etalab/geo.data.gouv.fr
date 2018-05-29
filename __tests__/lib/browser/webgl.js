import {isWebglSupported} from '../../../lib/browser/webgl'

describe('isWebglSupported', () => {
  it('should be false in test environment', () => {
    expect(isWebglSupported()).toBe(false)
  })
})
