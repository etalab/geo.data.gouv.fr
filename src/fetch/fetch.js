import { makeCancelable, cancelAll } from '../helpers/promises';
import { fetch as _f } from '../helpers/superfetch';

export function cancelAllPromise(component) {
  if (!component.cancelablePromises) return;
  return cancelAll(component.cancelablePromises);
}

function waitDataAndSetState(dataPromise, component, stateName) {
  const cancelablePromise = makeCancelable(dataPromise
    .then(data => {
      const update = {};
      update[stateName] = data;
      if (!component._calledComponentWillUnmount) component.setState(update);
    })
    .catch(err => {
      if (!component.state.errors.includes(err.message)) {
        const errors = [...component.state.errors, err.message]
        if (!component._calledComponentWillUnmount) component.setState({ errors })
      }
      throw err
    })
  )
  if (!component.cancelablePromises) component.cancelablePromises = []

  component.cancelablePromises.push(cancelablePromise)
  return cancelablePromise
}

export function fetchMetrics(component, catalogId) {
  if (!catalogId) return Promise.reject(new Error('catalogId is required'))
  const fetchPromise = _f(`https://inspire.data.gouv.fr/api/geogw/catalogs/${catalogId}/metrics`)
  return waitDataAndSetState(fetchPromise, component, 'metrics')
}

export function fetchCatalog(component, catalogId) {
  if (!catalogId) return Promise.reject(new Error('catalogId is required'))
  const fetchPromise = _f(`https://inspire.data.gouv.fr/api/geogw/catalogs/${catalogId}`)
  return waitDataAndSetState(fetchPromise, component, 'catalog')
}

export function fetchCatalogs(component) {
  const fetchPromise = _f('https://inspire.data.gouv.fr/api/geogw/catalogs')
  return waitDataAndSetState(fetchPromise, component, 'catalogs')
}

export function fetchHarvest(component, catalogId, harvestId) {
  if (!catalogId) return Promise.reject(new Error('catalogId is required'))
  if (!harvestId) return Promise.reject(new Error('harvestId is required'))
  const fetchPromise = _f(`https://inspire.data.gouv.fr/api/geogw/services/${catalogId}/synchronizations/${harvestId}`)
  return waitDataAndSetState(fetchPromise, component, 'harvest')
}

export function fetchHarvests(component, catalogId) {
  if (!catalogId) return Promise.reject(new Error('catalogId is required'))
  const fetchPromise = _f(`https://inspire.data.gouv.fr/api/geogw/services/${catalogId}/synchronizations`)
  return waitDataAndSetState(fetchPromise, component, 'harvests')
}

export function fetchDatasets(component) {
  const fetchPromise = _f('https://inspire.data.gouv.fr/api/datasets/metrics')
  return waitDataAndSetState(fetchPromise, component, 'datasets')
}
