import { remove, unionWith, find, isEqual, some } from 'lodash'

export const filterTradTable = {
  availability: 'téléchargeable',
  dgvPublication: 'publié sur data.gouv.fr',
  distributionFormat: 'format de distribution',
  keyword: 'mot-clé',
  metadataType: 'type de metadonnée',
  opendata: 'donnée ouverte',
  organization: 'organisation',
  representationType: 'type géographique',
  type: 'type',
  catalog: 'catalogue',
  yes: 'oui',
  no: 'non',
  'not-determined': 'non déterminé',
  other: 'autre',
  unknown: 'inconnu',
  none: 'aucun',
}

export function translateFilters(filter) {
  return filterTradTable[filter] || filter
}

export function addFilter(oldFilters, newFilter) {
  return unionWith(oldFilters, [newFilter], isEqual)
}

export function removeFilter(oldFilters, newFilter) {
  remove(oldFilters, newFilter)

  return oldFilters
}

export function replaceFilter(oldFilters, newFilter) {
  let filter = find(oldFilters, (filter) => filter.name === newFilter.name)

  if (!filter) return addFilter(oldFilters, newFilter)
  filter.value = newFilter.value

  return oldFilters
}

export function isActive(filters, filter) {
  return some(filters, filter)
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
