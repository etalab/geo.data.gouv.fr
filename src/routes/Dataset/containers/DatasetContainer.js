import { connect } from 'react-redux'

import { get } from '../modules/actions'

import DatasetPage from '../components/DatasetPage'

export default connect(
  (state, ownProps) => ({
    datasetId: ownProps.params.datasetId,
    dataset: state.dataset.dataset
  }),

  {
    getDataset: get
  }
)(DatasetPage)
