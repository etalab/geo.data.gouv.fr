import { connect } from 'react-redux'

import { get, getPublication, getOnDataGouv } from '../modules/actions'

import DatasetPage from '../components/DatasetPage'

export default connect(
  (state, ownProps) => ({
    datasetId: ownProps.params.datasetId,
    dataset: state.dataset.dataset,
    publication: state.dataset.publication,
    dataGouvDataset: state.dataset.dataGouvDataset
  }),

  {
    getDataset: get,
    getPublication,
    getDataGouvDataset: getOnDataGouv
  }
)(DatasetPage)
