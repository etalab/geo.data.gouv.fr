import catalog from '../__test__/catalog.json'
import metrics from '../__test__/metrics.json'
import datasets from '../__test__/datasets.json'

export function fetchMetrics(catalogId) {
  if (!catalogId) return Promise.reject(new Error('catalogId is required'))
  return new Promise( (resolve, reject) => {
    if (catalogId === '1') {
      resolve(metrics)
    } else {
      reject(new Error('Metrics not found'));
    };
  })
}

export function fetchCatalog(catalogId) {
  if (!catalogId) return Promise.reject(new Error('catalogId is required'))
  return new Promise( (resolve, reject) => {
    if (catalogId === '1') {
      resolve(catalog)
    } else {
      reject(new Error('Catalog not found'));
    };
  })
}

export function fetchDatasets(resolve=true) {
  return new Promise( (resolve, reject) => {
    if (resolve) {
      resolve(datasets)
    } else {
      reject(new Error('Datasets not found'));
    };
  })
}
