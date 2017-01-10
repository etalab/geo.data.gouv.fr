import { parseQuery, _extractFilters } from '../WrappedDatasets'

describe('_extractFilters', () => {
  it('should return filters array', () => {
    const qs = { keyword: 'bar', organization: 'foo' }
    const filters = [
      {name: 'keyword', value: 'bar'},
      {name: 'organization', value: 'foo'},
    ]
    const extractedFilters = _extractFilters(qs)

    expect(extractedFilters).to.deep.equal(filters)
  })

  it('should return only allowed filters', () => {
    const qs = { keyword: 'bar', q: 'foo' }
    const filters = [
      {name: 'keyword', value: 'bar'},
    ]
    const extractedFilters = _extractFilters(qs)

    expect(extractedFilters).to.deep.equal(filters)
  })

  it('should create one items for each value', () => {
    const qs = { keyword: ['foo', 'bar'] }
    const filters = [
      {name: 'keyword', value: 'foo'},
      {name: 'keyword', value: 'bar'},
    ]
    const extractedFilters = _extractFilters(qs)

    expect(extractedFilters).to.deep.equal(filters)
  })
})

describe('parseQuery', () => {
  it('should create an array of filters', () => {
    const query = 'q=42&page=2&keyword=keyword1&keyword=keyword2&organization=foo'
    const result = parseQuery(query)

    expect(result).to.deep.equal(
      {
        textInput: '42',
        page: '2',
        filters: [
          {name: 'keyword', value: 'keyword1'},
          {name: 'keyword', value: 'keyword2'},
          {name: 'organization', value: 'foo'},
        ],
      }
    )
  })
})
