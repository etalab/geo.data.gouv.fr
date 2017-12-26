export const ignoredFilters = [
  'q',
  'page',
  'offset',
  'limit'
]

export function getFilters(query) {
  const filters = []

  Object
    .entries(query)
    .filter(([name]) => !ignoredFilters.includes(name))
    .forEach(([name, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => filters.push({
          name,
          value: v
        }))
      } else {
        filters.push({name, value})
      }
    })

  return filters.reduce((acc, filter) => {
    (acc[filter.name] = acc[filter.name] || []).push(filter.value)
    return acc
  }, {})
}
