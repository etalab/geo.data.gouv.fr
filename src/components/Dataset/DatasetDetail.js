import React, { Component } from 'react'
import { fetchDataset } from '../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components'
import CircularProgress from 'material-ui/CircularProgress'
import DownloadsSection from './DownloadsSection'
import DatasetSection from './DatasetSection'
import KeywordsSection from './KeywordsSection'

export default class DatasetDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {errors: []}
  }

  componentWillMount() {
    return this.updateDataset()
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  updateDataset() {
    return waitForDataAndSetState(fetchDataset(this.props.params.datasetId), this, 'dataset')
  }

  render() {
    const dataset = this.state.dataset
    const styles = {
      loader: {
        position: 'absolute',
        top: '42%',
        left: '42%',
      },
      container: {
        display: 'flex',
        flexDirection: 'column',
        margin: '5em',
      },
      content: {
        display: 'flex',
        justifyContent: 'space-between',
      },
    }
    if (!dataset) return <CircularProgress style={styles.loader}  size={2} />
    return (
      <div style={styles.container}>
        <DatasetSection dataset={dataset} />
        <div style={styles.content}>
          <DownloadsSection links={dataset.metadata.links} />
          <KeywordsSection keywords={dataset.metadata.keywords} />
        </div>
    </div>)
  }
}
