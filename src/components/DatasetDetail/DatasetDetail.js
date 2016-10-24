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
    if (!dataset) return <CircularProgress size={2} />
    return (<div>
      <h1>{dataset.metadata.title}</h1>
    </div>)
  }
}
