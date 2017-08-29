import React from 'react'
import PropTypes from 'prop-types'

import Loader from 'common/components/Loader'

import DatasetView from '../DatasetView'

import styles from './DatasetPage.scss'

class DatasetPage extends React.PureComponent {
  static propTypes = {
    datasetId: PropTypes.string.isRequired,

    dataset: PropTypes.shape({
      dataset: PropTypes.object,

      pending: PropTypes.bool.isRequired,

      error: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object
      ]).isRequired
    }).isRequired,

    publication: PropTypes.shape({
      publication: PropTypes.object,

      pending: PropTypes.bool.isRequired,

      error: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object
      ]).isRequired
    }).isRequired,

    dataGouvDataset: PropTypes.object.isRequired,

    getDataset: PropTypes.func.isRequired,
    getPublication: PropTypes.func.isRequired,
    getDataGouvDataset: PropTypes.func.isRequired,
    fetchGeoJson: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { getDataset, getPublication, datasetId } = this.props

    getDataset(datasetId)
    getPublication(datasetId)
  }

  render () {
    const { dataset, publication, dataGouvDataset, getDataGouvDataset, fetchGeoJson } = this.props

    return (
      <div>
        <Loader
          isLoading={dataset.pending || !dataset.dataset || publication.pending}
          error={dataset.error}
          className={styles.loader}
        >
          <DatasetView
            dataset={dataset.dataset}
            publication={publication.publication}
            dataGouvDataset={dataGouvDataset}
            getDataGouvDataset={getDataGouvDataset}
            fetchGeoJson={fetchGeoJson}
          />
        </Loader>
      </div>
    )
  }
}

export default DatasetPage
