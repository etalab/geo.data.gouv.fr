import { _get, _put, _post, _delete } from '../helpers/super'

const { PUBLICATION_API_URL, INSPIRE_API_URL, DATAGOUV_API_URL } = process.env

export function fetchCatalog(catalogId) {
  if (!catalogId) return Promise.reject(new Error('catalogId is required'))
  return _get(`${INSPIRE_API_URL}/catalogs/${catalogId}`)
}

export function fetchCatalogs() {
  return _get(`${INSPIRE_API_URL}/catalogs`)
}

export function getUser() {
  return _get(`${PUBLICATION_API_URL}/me`)
}

export function getOrganization(organizationId) {
  if (!organizationId) return Promise.reject(new Error('organizationId is required'))
  return _get(`${PUBLICATION_API_URL}/organizations/${organizationId}`)
}

export function getOrganizationDetail(organizationId) {
  if (!organizationId) return Promise.reject(new Error('organizationId is required'))
  return _get(`${PUBLICATION_API_URL}/organizations/${organizationId}/profile`)
}

export function fetchOrganizationMetrics(organizationId) {
  if (!organizationId) return Promise.reject(new Error('organizationId is required'))
  return _get(`${PUBLICATION_API_URL}/organizations/${organizationId}/datasets/metrics`)
}

export function fetchOrganizationPublished(organizationId) {
  if (!organizationId) return Promise.reject(new Error('organizationId is required'))
  return _get(`${PUBLICATION_API_URL}/organizations/${organizationId}/datasets/published`)
}

export function fetchOrganizationNotPublishedYet(organizationId) {
  if (!organizationId) return Promise.reject(new Error('organizationId is required'))
  return _get(`${PUBLICATION_API_URL}/organizations/${organizationId}/datasets/not-published-yet`)
}

export function fetchOrganizationPublishedByOthers(organizationId) {
  if (!organizationId) return Promise.reject(new Error('organizationId is required'))
  return _get(`${PUBLICATION_API_URL}/organizations/${organizationId}/datasets/published-by-others`)
}

export function publishDataset(datasetId, organizationId) {
  if (!datasetId) return Promise.reject(new Error('datasetId is required'))
  if (!organizationId) return Promise.reject(new Error('organizationId is required'))
  const url = `${PUBLICATION_API_URL}/datasets/${datasetId}/publication`

  return _put(url, { organization: organizationId })
}

export function updateOrganizationAccount(organizationId, organization = {}) {
  if (!organizationId) return Promise.reject(new Error('organizationId is required'))
  const url = `${PUBLICATION_API_URL}/organizations/${organizationId}`
  return _put(url, organization)
}

export function getOrganizationProducers(organizationId) {
  if (!organizationId) return Promise.reject(new Error('organizationId is required'))
  return _get(`${PUBLICATION_API_URL}/organizations/${organizationId}/producers`)
}

export function dissociateProducer(producerId, organizationId) {
  if (!producerId && organizationId) return Promise.reject(new Error('producerId and organizationId is required'))
  const url = `${PUBLICATION_API_URL}/organizations/${organizationId}/producers/${producerId}`

  return _delete(url)
}

export function associateProducer(producerId, organizationId) {
  if (!producerId && organizationId) return Promise.reject(new Error('producerId and organizationId is required'))
  const url = `${PUBLICATION_API_URL}/organizations/${organizationId}/producers`
  const params = { '_id': producerId }

  return _post(url, params)
}

export function getProducersToAssociate(catalogId) {
  if (!catalogId) return Promise.reject(new Error('catalogId is required'))
  const url = `${INSPIRE_API_URL}/services/${catalogId}/records?resultParts=facets&opendata=yes&availability=yes&facets[keyword]=0`

  return _get(url)
}

export function getOrganizations(organizationsId) {
  return Promise.all(organizationsId.map(id => getOrganization(id)))
}

// DATA.GOUV.FR
export function getDiscussions(datasetId) {
  if (!datasetId) return Promise.reject(new Error('datasetId is required'))
  const url = `${DATAGOUV_API_URL}/discussions/?for=${datasetId}`

  return _get(url)
}

export function createNewDiscussion(discussion) {
  const url = `${DATAGOUV_API_URL}/discussions/`

  return _post(url, discussion)
}

export function createNewReply(content, discussionId) {
  const url = `${DATAGOUV_API_URL}/discussions/${discussionId}/`

  return _post(url, content)
}
