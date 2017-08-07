import catalog from '../__test__/catalog.json'
import catalogs from '../__test__/catalogs.json'
import producers from '../__test__/producers.json'
import user from '../__test__/user.json'
import organization from '../__test__/organization.json'
import organizationProducers from '../__test__/organizationProducers.json'
import organizationDetail from '../__test__/organizationDetail.json'
import organizationMetrics from '../__test__/organizationMetrics.json'
import organizationDatasets from '../__test__/organizationDatasets.json'
import organizationNotPublishedYetDatasets from '../__test__/organizationNotPublishedYetDatasets.json'
import discussions from '../__test__/discussions.json'

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

export function publishDataset(datasetId, organizationId) {
  if (!datasetId) return Promise.reject(new Error('datasetId is required'))
  if (!organizationId) return Promise.reject(new Error('organizationId is required'))
  if (organizationId === '1') return Promise.resolve(organizationNotPublishedYetDatasets)
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

// DATA.GOUV.FR
export function getDiscussions(datasetId) {
  if (!datasetId) return Promise.reject(new Error('datasetId is required'))
  if (datasetId === '1') return Promise.resolve(discussions)
  return Promise.reject(new Error('data.gouv.fr dataset not found'))
}

export function createNewDiscussion(discussion) {
  if (!discussion) return Promise.reject(new Error('discussion is required'))
  return Promise.resolve(discussion)
}
