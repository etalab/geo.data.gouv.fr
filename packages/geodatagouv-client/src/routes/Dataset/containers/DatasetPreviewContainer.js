import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import DatasetPreview from '../components/DatasetPreview'

const DatasetPreviewContainer = connect((state, ownProps) => {
  return ({
    preview: ownProps.preview,
    closePreview: ownProps.closePreview,
    geoJson: state.dataset.geoJson
  })
}
)(DatasetPreview)

DatasetPreviewContainer.propTypes = {
  preview: PropTypes.object.isRequired,
  closePreview: PropTypes.func.isRequired
}

export default DatasetPreviewContainer
