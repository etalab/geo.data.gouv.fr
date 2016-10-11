export default function fetchMetrics(component, catalogId) {
  if (!component.state.metrics) {
    fetch(`https://inspire.data.gouv.fr/api/geogw/catalogs/${catalogId}/metrics`)
      .then((response) => response.json())
      .then((metrics) => {
        component.setState({metrics})
      })
      .catch((err) => {
        console.error(err)
      })
    }
  }
