import formats from '../../lib/formats'

test('formats should be a valid array of formats', () => {
  formats.forEach(format => {
    expect(format).toHaveProperty('label')
    expect(format).toHaveProperty('format')
    expect(format).toHaveProperty('projection')
  })
})
