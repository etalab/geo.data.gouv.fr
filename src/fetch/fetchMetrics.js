export default function fetchMetrics(catalogId) {
  return fetch(`https://inspire.data.gouv.fr/api/geogw/catalogs/${catalogId}/metrics`)
    .then(response => response.json())
    .catch((err) => {
      console.error(err)
    })
  }
