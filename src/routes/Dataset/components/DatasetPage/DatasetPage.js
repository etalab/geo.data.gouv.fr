import React from 'react'
import PropTypes from 'prop-types'

import Loader from 'common/components/Loader'

import DatasetView from '../DatasetView'

import styles from './DatasetPage.scss'

class DatasetPage extends React.PureComponent {
  static propTypes = {
    dataset: PropTypes.shape({
      dataset: PropTypes.object,

      pending: PropTypes.bool.isRequired,

      error: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object
      ]).isRequired,
    }).isRequired,

    getDataset: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { getDataset, datasetId } = this.props

    getDataset(datasetId)
  }

  render () {
    const { dataset } = this.props

    return (
     <div>
        <Loader loading={dataset.pending || !dataset.dataset} error={dataset.error} className={styles.loader}>
          <DatasetView
            dataset={dataset.dataset}
          />
        </Loader>
      </div>
    )
  }
}

export default DatasetPage
