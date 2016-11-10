import { remove, unionWith, isEqual, find } from 'lodash'

export function addFilter(oldFilters, newFilter) {
  return unionWith(oldFilters, [newFilter], isEqual)
}

export function removeFilter(oldFilters, newFilter) {
  remove(oldFilters, newFilter)

  return oldFilters
}

export function isActive(filters, filter) {
  return find(filters, filter) ? true : false
}

export function convertFilters(filters) {
  let reducedFilters = []
  if (filters) {
    reducedFilters = filters.reduce((acc, current) => {
      if (!acc[current.name]) acc[current.name] = []
      acc[current.name].push(current.value)
      return acc
    }, {})
  }
  return reducedFilters
}
