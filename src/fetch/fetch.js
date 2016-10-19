export function cancelAllPromise(component) {
  return component.cancelablePromises.map( promise => promise.cancel())
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

function _f(url) {
  return fetch(url)
    .then(response => response.json())
    .catch((err) => {
      console.error(err)
      throw err
    })
}

function waitDataAndSetState(dataPromise, component, stateName) {
  const cancelablePromise = makeCancelable(dataPromise
    .then(data => {
      const update = {};
      update[stateName] = data;
      component.setState(update);
    })
    .catch(err => {
      if (!component.state.errors.includes(err.message)) {
        const errors = [...component.state.errors, err.message]
        component.setState({ errors })
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

export function fetchDatasets(component) {
  const fetchPromise = _f('https://inspire.data.gouv.fr/api/datasets/metrics')
  return waitDataAndSetState(fetchPromise, component, 'datasets')
}
