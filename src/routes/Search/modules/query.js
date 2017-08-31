import qs from 'querystring'

export const DISABLED_FILTERS = [
  'q',
  'page',
  'offset',
  'limit'
]

export const parseQueryString = (search = '') => {
  if (search.startsWith('?')) {
    search = search.substring(1)
  }

  return qs.parse(search)
}

export const parse = (search = '') => {
  const filters = []
  const query = parseQueryString(search)

  Object.entries(query).forEach(([name, value]) => {
    if (DISABLED_FILTERS.includes(name)) {
      return
    }

    if (Array.isArray(value)) {
      value.forEach(v => {
        filters.push({
          name,
          value: v
        })
      })
    } else {
      filters.push({ name, value })
    }
  })

  return {
    textInput: query.q,
    page: parseInt(query.page, 10) || 1,
    filters
  }
}

export const flattenFilters = filters => filters.reduce((acc, filter) => {
  (acc[filter.name] = acc[filter.name] || []).push(filter.value)
  return acc
}, {})

export const update = (search = '', changes = {}) => {
  const {
    q: iq,
    page: ipage,
    ...filters
  } = parseQueryString(search)

  const q = 'q' in changes ? changes.q : iq

  // Either we specify a page number, or we go back to the first page.
  const page = changes.page || 1

  return {
    ...(q ? { q } : {}),

    ...(page && page > 1 ? { page } : {}),

    ...(changes.filters ? flattenFilters(changes.filters) : filters)
  }
}

export default {
  parse,
  update
}
