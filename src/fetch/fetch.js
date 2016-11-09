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

export function _concatUrlQuery(url, query) {
  if (query) return url + '?' + query
  return url
}

export function _updateUrlQuery(query) {
  let currentUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`
  const newUrl = _concatUrlQuery(currentUrl, query)

  history.replaceState({path: newUrl}, '', newUrl)
}

export function _builQuery(q, filters, page) {
  const qsFilters = convertFilters(filters)
  const query = qs.stringify({q, page, ...qsFilters}, { indices: false })

  return query
}

export function search(url, textInput, filters, page) {
  if (!url) return Promise.reject(new Error('url is required'))
  const builQuery = _builQuery(textInput, filters, page)
  const concatUrl = _concatUrlQuery(url, builQuery)
  _updateUrlQuery(builQuery)

  return _f(concatUrl)
}
