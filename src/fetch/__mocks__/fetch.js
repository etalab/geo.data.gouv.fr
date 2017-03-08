import catalog from '../__test__/catalog.json'
import catalogs from '../__test__/catalogs.json'
import metrics from '../__test__/metrics.json'
import harvest from '../__test__/harvest.json'
import harvests from '../__test__/harvests.json'
import producers from '../__test__/producers.json'
import globalMetrics from '../__test__/globalMetrics.json'
import datasetsSearch from '../__test__/datasetsSearch.json'
import dataset from '../__test__/dataset.json'
import user from '../__test__/user.json'
import organization from '../__test__/organization.json'
import organizationProducers from '../__test__/organizationProducers.json'
import organizationDetail from '../__test__/organizationDetail.json'
import organizationMetrics from '../__test__/organizationMetrics.json'
import organizationDatasets from '../__test__/organizationDatasets.json'
import organizationNotPublishedYetDatasets from '../__test__/organizationNotPublishedYetDatasets.json'
import dataGouvPublication from '../__test__/dataGouvPublication.json'
import dataGouvDataset from '../__test__/dataGouvDataset.json'

export function fetchMetrics(catalogId) {
  if (!catalogId) return Promise.reject(new Error('catalogId is required'))
  if (catalogId === '1') return Promise.resolve(metrics)
  return Promise.reject(new Error('metrics not found'))
}

export function fetchCatalog(catalogId) {
  if (!catalogId) return Promise.reject(new Error('catalogId is required'))
  if (catalogId === '1') return Promise.resolve(catalog)
  return Promise.reject(new Error('catalog not found'))
}

export function fetchCatalogs() {
  return Promise.resolve(catalogs) // Finding a solution to Promise.reject()
}

export function getProducers() {
  return Promise.resolve(producers)
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

export function getOrganizationDetail(organizationId) {
  if (!organizationId) return Promise.reject(new Error('organizationId is required'))
  if (organizationId === '1') return Promise.resolve(organizationDetail)
  return Promise.reject(new Error('organization not found'))
}

export function fetchOrganizationMetrics(organizationId) {
  if (!organizationId) return Promise.reject(new Error('organizationId is required'))
  if (organizationId === '1') return Promise.resolve(organizationMetrics)
  return Promise.reject(new Error('organization metrics not found'))
}

export function fetchOrganizationPublished(organizationId) {
  if (!organizationId) return Promise.reject(new Error('organizationId is required'))
  if (organizationId === '1') return Promise.resolve(organizationDatasets)
  return Promise.reject(new Error('organization published datasets not found'))
}

export function fetchOrganizationNotPublishedYet(organizationId) {
  if (!organizationId) return Promise.reject(new Error('organizationId is required'))
  if (organizationId === '1') return Promise.resolve(organizationNotPublishedYetDatasets)
  return Promise.reject(new Error('organization not published yet datasets not found'))
}

export function fetchOrganizationPublishedByOthers(organizationId) {
  if (!organizationId) return Promise.reject(new Error('organizationId is required'))
  if (organizationId === '1') return Promise.resolve(organizationDatasets)
  return Promise.reject(new Error('organization published by others datasets not found'))
}

export function getOrganizationProducers(organizationId) {
  if (!organizationId) return Promise.reject(new Error('organizationId is required'))
  if (organizationId === '1') return Promise.resolve(organizationProducers)
  return Promise.reject(new Error('organization published by others datasets not found'))
}

export function getDataGouvPublication(datasetId) {
  if (!datasetId) return Promise.reject(new Error('datasetId is required'))
  if (datasetId === '1') return Promise.resolve(dataGouvPublication)
  return Promise.reject(new Error('data.gouv.fr publication not found'))
}

export function getDatasetOnDataGouv(datasetId) {
  if (!datasetId) return Promise.reject(new Error('datasetId is required'))
  if (datasetId === '1') return Promise.resolve(dataGouvDataset)
  return Promise.reject(new Error('data.gouv.fr dataset not found'))
}
