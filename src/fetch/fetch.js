function _f(url) {
  return fetch(url)
    .then(response => response.json())
    .catch((err) => {
      console.error(err)
    })
}

export function fetchMetrics(catalogId) {
  if (!catalogId) return Promise.reject(new Error('catalogId is required'))
  return _f(`https://inspire.data.gouv.fr/api/geogw/catalogs/${catalogId}/metrics`)
}

export function fetchCatalog(catalogId) {
  if (!catalogId) return Promise.reject(new Error('catalogId is required'))
  return _f(`https://inspire.data.gouv.fr/api/geogw/catalogs/${catalogId}`)
}
