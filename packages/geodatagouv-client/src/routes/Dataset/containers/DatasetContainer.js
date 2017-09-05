import { connect } from 'react-redux'

import { get, getPublication, getOnDataGouv, fetchGeoJson } from '../modules/actions'

import DatasetPage from '../components/DatasetPage'

export default connect(({ dataset }, { match }) => ({
  datasetId: match.params.datasetId,
  dataset: dataset.dataset,
  publication: dataset.publication,
  dataGouvDataset: dataset.dataGouvDataset
}), {
  getDataset: get,
  getPublication,
  getDataGouvDataset: getOnDataGouv,
  fetchGeoJson
})(DatasetPage)
