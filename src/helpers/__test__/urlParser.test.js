import { parseQuery, _extractFilters } from '../urlParser'

describe('_extractFilters', () => {
  it('should return filters array', () => {
    const qs = { keywords: 'bar', organizations: 'foo' }
    const filters = [
      {name: 'keywords', value: 'bar'},
      {name: 'organizations', value: 'foo'},
    ]
    const extractedFilters = _extractFilters(qs)

    expect(extractedFilters).toEqual(filters)
  })

  it('should return only allowed filters', () => {
    const qs = { keywords: 'bar', notAllowed: 'foo' }
    const filters = [
      {name: 'keywords', value: 'bar'},
    ]
    const extractedFilters = _extractFilters(qs)

    expect(extractedFilters).toEqual(filters)
  })

  it('should create one items for each value', () => {
    const qs = { keywords: ['foo', 'bar'] }
    const filters = [
      {name: 'keywords', value: 'foo'},
      {name: 'keywords', value: 'bar'},
    ]
    const extractedFilters = _extractFilters(qs)

    expect(extractedFilters).toEqual(filters)
  })
})

describe('parseQuery', () => {
  it('should regroupe chaque clef dans un même array', () => {
    const query = 'q=42&page=2&keywords=keyword1&keywords=keyword2&organizations=foo'
    const result = parseQuery(query)

    expect(result).toEqual(
      {
        textInput: '42',
        page: '2',
        filters: [
          {name: 'keywords', value: 'keyword1'},
          {name: 'keywords', value: 'keyword2'},
          {name: 'organizations', value: 'foo'},
        ],
      }
    )
  })
})
