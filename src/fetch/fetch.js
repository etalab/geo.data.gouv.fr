import superfetch from '../helpers/superfetch'
import { convertFilters } from '../helpers/manageFilters'
import qs from 'qs'
const _f = superfetch;

export function fetchMetrics(catalogId) {
  if (!catalogId) return Promise.reject(new Error('catalogId is required'));
  return _f(`https://inspire.data.gouv.fr/api/geogw/catalogs/${catalogId}/metrics`);
}

export function fetchCatalog(catalogId) {
  if (!catalogId) return Promise.reject(new Error('catalogId is required'));
  return  _f(`https://inspire.data.gouv.fr/api/geogw/catalogs/${catalogId}`);
}

export function fetchCatalogs() {
  return _f('https://inspire.data.gouv.fr/api/geogw/catalogs');
}

export function fetchHarvest(catalogId, harvestId) {
  if (!catalogId) return Promise.reject(new Error('catalogId is required'))
  if (!harvestId) return Promise.reject(new Error('harvestId is required'))
  return _f(`https://inspire.data.gouv.fr/api/geogw/services/${catalogId}/synchronizations/${harvestId}`)
}

export function fetchHarvests(catalogId) {
  if (!catalogId) return Promise.reject(new Error('catalogId is required'))
  return _f(`https://inspire.data.gouv.fr/api/geogw/services/${catalogId}/synchronizations`)
}

export function fetchGlobalMetrics() {
  return _f('https://inspire.data.gouv.fr/dgv/api/datasets/metrics');
}

export function fetchDataset(datasetId) {
  if (!datasetId) return Promise.reject(new Error('datasetId is required'))
  return _f(`https://inspire.data.gouv.fr/api/geogw/records/${datasetId}`)
}

export function fetchGeoJSON(link) {
  if (!link) return Promise.reject(new Error('link is required'))
  return _f(link + '?format=GeoJSON&projection=WGS84')
}

export function buildSearchQuery(q, filters, page) {
  const qsFilters = convertFilters(filters)
  const query = qs.stringify({q, page, ...qsFilters}, { indices: false })

  return query
}

export function search(q, filters, offset) {
  const qsFilters = convertFilters(filters)
  const query = qs.stringify({q, offset, ...qsFilters}, { indices: false })

  return _f('https://inspire.data.gouv.fr/api/geogw/records?' + query)
}

export function getUser() {
  return _f('https://inspire.data.gouv.fr/dgv/api/me', { credentials: 'include', mode: 'cors' })
}

export function getOrganization(organizationId) {
  if (!organizationId) return Promise.reject(new Error('organizationId is required'))
  return _f(`https://inspire.data.gouv.fr/dgv/api/organizations/${organizationId}`)
}

export function getOrganizationDetail(organizationId) {
  if (!organizationId) return Promise.reject(new Error('organizationId is required'))
  return _f(`https://www.data.gouv.fr/api/1/organizations/${organizationId}/`)
}

export function fetchOrganizationMetrics(organizationId) {
  if (!organizationId) return Promise.reject(new Error('organizationId is required'))
  return _f(`https://inspire.data.gouv.fr/dgv/api/organizations/${organizationId}/datasets/metrics`)
}

export function fetchOrganizationPublished(organizationId) {
  if (!organizationId) return Promise.reject(new Error('organizationId is required'))
  return _f(`https://inspire.data.gouv.fr/dgv/api/organizations/${organizationId}/datasets/published`)
}

export function fetchOrganizationNotPublishedYet(organizationId) {
  if (!organizationId) return Promise.reject(new Error('organizationId is required'))
  return _f(`https://inspire.data.gouv.fr/dgv/api/organizations/${organizationId}/datasets/not-published-yet`)
}

export function fetchOrganizationPublishedByOthers(organizationId) {
  if (!organizationId) return Promise.reject(new Error('organizationId is required'))
  return _f(`https://inspire.data.gouv.fr/dgv/api/organizations/${organizationId}/datasets/published-by-others`)
}

export function publishDataset(datasetId, organizationId) {
  if (!datasetId || !organizationId) return Promise.reject(new Error('datasetId and organizationId are required'))
  return _f(`https://inspire.data.gouv.fr/dgv/api/datasets/${datasetId}/publication`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify({ organization: organizationId })
  })
}
