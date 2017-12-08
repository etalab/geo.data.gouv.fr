import licenses from '../../lib/licenses'

test('licenses should be a valid hash of licenses', () => {
  Object.values(licenses).forEach(license => {
    expect(license).toHaveProperty('name')
    expect(license).toHaveProperty('link')
  })
})
