import catalog from '../__test__/catalog.json'
import catalogs from '../__test__/catalogs.json'
import metrics from '../__test__/metrics.json'
import harvest from '../__test__/harvest.json'
import harvests from '../__test__/harvests.json'
import globalMetrics from '../__test__/globalMetrics.json'
import datasetsSearch from '../__test__/datasetsSearch.json'
import dataset from '../__test__/dataset.json'
import user from '../__test__/user.json'
import organization from '../__test__/organization.json'
import organizationMetrics from '../__test__/organization.json'

export function fetchMetrics(catalogId) {
  if (!catalogId) return Promise.reject(new Error('catalogId is required'));
  if (catalogId === '1') return Promise.resolve(metrics)
  return Promise.reject(new Error('metrics not found'))
}

export function fetchCatalog(catalogId) {
  if (!catalogId) return Promise.reject(new Error('catalogId is required'));
  if (catalogId === '1') return Promise.resolve(catalog)
  return Promise.reject(new Error('catalog not found'))
}

export function fetchCatalogs() {
  return Promise.resolve(catalogs) // Finding a solution to Promise.reject()
}

export function fetchHarvest(catalogId, harvestId) {
  if (!catalogId) return Promise.reject(new Error('catalogId is required'))
  if (!harvestId) return Promise.reject(new Error('harvestId is required'))
  if (catalogId === '1') return Promise.resolve(harvest)
  return Promise.reject(new Error('harvest not found'))
}

export function fetchHarvests(catalogId) {
  if (!catalogId) return Promise.reject(new Error('catalogId is required'))
  if (catalogId === '1') return Promise.resolve(harvests)
  return Promise.reject(new Error('harvests not found'))
}

export function fetchGlobalMetrics() {
  return Promise.resolve(globalMetrics) // Finding a solution to Promise.reject()
}

export function fetchDataset(datasetId) {
  if (!datasetId) return Promise.reject(new Error('datasetId is required'))
  if (datasetId === '1') return Promise.resolve(dataset)
  return Promise.reject(new Error('dataset not found'))
}

export function search(q, filters, offset) {
  return Promise.resolve(datasetsSearch)
}

export function getUser() {
  return Promise.resolve(user)
}

export function getOrganization(organizationId) {
  if (!organizationId) return Promise.reject(new Error('organizationId is required'))
  if (organizationId === '1') return Promise.resolve(organization)
  return Promise.reject(new Error('organization not found'))
}

export function fetchOrganizationMetrics(organizationId) {
  if (!organizationId) return Promise.reject(new Error('organizationId is required'))
  if (organizationId === '1') return Promise.resolve(organizationMetrics)
  return Promise.reject(new Error('organization metrics not found'))
}
