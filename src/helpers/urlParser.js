import { forEach } from 'lodash'
import qs from 'qs'

const ALLOWED_FILTERS = ['organization', 'keyword', 'availability']

export function _extractFilters(query) {
  let filters = []
  forEach(query, function(value, key) {
    if (ALLOWED_FILTERS.includes(key)) {
      if (typeof(value) === 'object') {
        forEach(value, function(current) {
          filters.push({name: key, value: current})
        })
      } else {
        filters.push({name: key, value})
      }
    }
  })

  return filters
}

export function parseQuery(query) {
  const parse = qs.parse(query)

  return {
    textInput: parse.q,
    page: parse.page,
    filters: _extractFilters(parse),
  }
}
