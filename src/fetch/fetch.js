import qs from 'qs'
import { superRequest, superfetch } from '../helpers/super'
import { convertFilters } from '../helpers/manageFilters'

export function fetchMetrics(catalogId) {
  if (!catalogId) return Promise.reject(new Error('catalogId is required'))
  return superfetch(`https://inspire.data.gouv.fr/api/geogw/catalogs/${catalogId}/metrics`)
}

export function fetchCatalog(catalogId) {
  if (!catalogId) return Promise.reject(new Error('catalogId is required'))
  return  superfetch(`https://inspire.data.gouv.fr/api/geogw/catalogs/${catalogId}`)
}

export function fetchCatalogs() {
  return superfetch('https://inspire.data.gouv.fr/api/geogw/catalogs')
}

export function fetchHarvest(catalogId, harvestId) {
  if (!catalogId) return Promise.reject(new Error('catalogId is required'))
  if (!harvestId) return Promise.reject(new Error('harvestId is required'))
  return superfetch(`https://inspire.data.gouv.fr/api/geogw/services/${catalogId}/synchronizations/${harvestId}`)
}

export function fetchHarvests(catalogId) {
  if (!catalogId) return Promise.reject(new Error('catalogId is required'))
  return superfetch(`https://inspire.data.gouv.fr/api/geogw/services/${catalogId}/synchronizations`)
}

export function fetchGlobalMetrics() {
  return superfetch('https://inspire.data.gouv.fr/dgv/api/datasets/metrics')
}

export function fetchDataset(datasetId) {
  if (!datasetId) return Promise.reject(new Error('datasetId is required'))
  return superfetch(`https://inspire.data.gouv.fr/api/geogw/records/${datasetId}`)
}

export function getProducers() {
  return superfetch('https://inspire.data.gouv.fr/dgv/api/producers')
}

export function fetchGeoJSON(link) {
  if (!link) return Promise.reject(new Error('link is required'))
  return superfetch(link + '?format=GeoJSON&projection=WGS84')
}

export function buildSearchQuery(q, filters, page) {
  const qsFilters = convertFilters(filters)
  const query = qs.stringify({q, page, ...qsFilters}, { indices: false })

  return query
}

export function search(q, filters, offset) {
  const qsFilters = convertFilters(filters)
  const query = qs.stringify({q, offset, ...qsFilters}, { indices: false })

  return superfetch('https://inspire.data.gouv.fr/api/geogw/records?' + query)
}

export function getUser() {
  return superfetch('https://inspire.data.gouv.fr/dgv/api/me', { credentials: 'include', mode: 'cors' })
}

export function getOrganization(organizationId) {
  if (!organizationId) return Promise.reject(new Error('organizationId is required'))
  return superfetch(`https://inspire.data.gouv.fr/dgv/api/organizations/${organizationId}`)
}

export function getOrganizationDetail(organizationId) {
  if (!organizationId) return Promise.reject(new Error('organizationId is required'))
  return superfetch(`https://www.data.gouv.fr/api/1/organizations/${organizationId}/`)
}

export function fetchOrganizationMetrics(organizationId) {
  if (!organizationId) return Promise.reject(new Error('organizationId is required'))
  return superfetch(`https://inspire.data.gouv.fr/dgv/api/organizations/${organizationId}/datasets/metrics`)
}

export function fetchOrganizationPublished(organizationId) {
  if (!organizationId) return Promise.reject(new Error('organizationId is required'))
  return superfetch(`https://inspire.data.gouv.fr/dgv/api/organizations/${organizationId}/datasets/published`)
}

export function fetchOrganizationNotPublishedYet(organizationId) {
  if (!organizationId) return Promise.reject(new Error('organizationId is required'))
  return superfetch(`https://inspire.data.gouv.fr/dgv/api/organizations/${organizationId}/datasets/not-published-yet`)
}

export function fetchOrganizationPublishedByOthers(organizationId) {
  if (!organizationId) return Promise.reject(new Error('organizationId is required'))
  return superfetch(`https://inspire.data.gouv.fr/dgv/api/organizations/${organizationId}/datasets/published-by-others`)
}

export function publishDataset(datasetId, organizationId) {
  if (!datasetId || !organizationId) return Promise.reject(new Error('datasetId and organizationId are required'))
  const url = `https://inspire.data.gouv.fr/dgv/api/datasets/${datasetId}/publication`

  return superRequest(url, 'PUT', { organization: organizationId })
}

export function updateCatalogSources(sourceCatalogs, organizationId) {
  if (!sourceCatalogs || !organizationId) return Promise.reject(new Error('sourceCatalogs and organizationId are required'))
  const url = `https://inspire.data.gouv.fr/dgv/api/organizations/${organizationId}`
  const params = {
    sourceCatalogs: sourceCatalogs,
    publishAll: true,
  }

  return superRequest(url, 'PUT', params)
}

export function syncCatalog(catalogId) {
  if (!catalogId) return Promise.reject(new Error('catalogId is required'))
  return superRequest(`https://inspire.data.gouv.fr/api/geogw/services/${catalogId}/sync`, 'POST')
}

export function dissociateProducer(producerId, organizationId) {
  if (!producerId && organizationId) return Promise.reject(new Error('producerId and organizationId is required'))
  const url = `https://inspire.data.gouv.fr/dgv/api/organizations/${organizationId}/producers/${producerId}`

  return superRequest(url, 'DELETE')
}

export function associateProducer(producerId, organizationId) {
  if (!producerId && organizationId) return Promise.reject(new Error('producerId and organizationId is required'))
  const url = `https://inspire.data.gouv.fr/dgv/api/organizations/${organizationId}/producers`
  const params = { '_id': producerId, 'associatedTo': organizationId }

  return superRequest(url, 'POST', params)
}
