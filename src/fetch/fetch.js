import superfetch from '../helpers/superfetch';

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
  return _f('https://inspire.data.gouv.fr/api/datasets/metrics');
}

export function fetchDataset(datasetId) {
  if (!datasetId) return Promise.reject(new Error('datasetId is required'))
  return _f(`https://inspire.data.gouv.fr/api/geogw/records/${datasetId}`)
}
