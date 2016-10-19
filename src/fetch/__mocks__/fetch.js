import catalog from '../__test__/catalog.json'
import metrics from '../__test__/metrics.json'
import datasets from '../__test__/datasets.json'

export function cancelAllPromise(component) {
  component.cancelablePromise.map( promise => promise.cancel())
}

export const makeCancelable = (promise) => {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then((val) =>
      hasCanceled_ ? reject({isCanceled: true}) : resolve(val)
    );
    promise.catch((error) =>
      hasCanceled_ ? reject({isCanceled: true}) : reject(error)
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};

function _f(data) {
  return new Promise( (resolve, reject) => {
    if (data) {
      return resolve(data)
    } else {
      return reject()
    }
  })
}

function waitDataAndSetState(dataPromise, component, stateName) {
  const cancelablePromise = makeCancelable(dataPromise
    .then(data => {
      component.setState({stateName});
    })
    .catch(err => {
      if (!component.state.errors.includes(err.message)) {
        const errors = [...component.state.errors, err.message]
        component.setState({ errors })
      }
      throw err
    })
  )

    component.setState({cancelablePromise})
    return cancelablePromise
}

export function fetchMetrics(component, catalogId) {
  if (!catalogId) return Promise.reject(new Error('catalogId is required'))
  const fetchPromise = catalogId === '1' ? _f(metrics) : _f()
  return waitDataAndSetState(fetchPromise, component, metrics)
}

export function fetchCatalog(component, catalogId) {
  if (!catalogId) return Promise.reject(new Error('catalogId is required'))
  const fetchPromise = catalogId === '1' ? _f(catalog) : _f()
  return waitDataAndSetState(fetchPromise, component, catalog)
}

export function fetchDatasets(component) {
  const fetchPromise = _f(datasets)
  return waitDataAndSetState(fetchPromise, component, datasets)
}
