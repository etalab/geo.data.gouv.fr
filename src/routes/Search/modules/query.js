export const DISABLED_FILTERS = [
  'q',
  'page',
  'offset',
  'limit'
]

export const parse = (query = {}) => {
  const filters = []

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

export const update = (initial, changes) => {
  const location = { ...initial }
  const { q: iq, page: ipages, ...filters } = location.query

  const q = changes.q || iq
  const page = changes.page || ipages

  const query = {
    ...(q ? { q } : {}),

    ...(page && page > 1 ? { page } : {}),

    ...(changes.filters ? flattenFilters(changes.filters) : filters)
  }

  location.pathname = '/search'
  location.query = query

  return location
}

export default {
  parse,
  update
}
