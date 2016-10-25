import React, { Component } from 'react'
import { fetchDataset } from '../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components'
import CircularProgress from 'material-ui/CircularProgress'
import LinksSection from './LinksSection'
import DatasetSection from './DatasetSection'
import KeywordsSection from './KeywordsSection'
import CatalogsSection from './CatalogsSection'

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
      sections: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '1em',
      },
    }
    if (!dataset) return <CircularProgress style={styles.loader}  size={2} />
    return (
      <div style={styles.container}>
        <DatasetSection dataset={dataset} />
        <div style={styles.sections}>
          <LinksSection links={dataset.metadata.links} />
          <KeywordsSection keywords={dataset.metadata.keywords} />
          <CatalogsSection catalogs={dataset.catalogs} />
        </div>
    </div>)
  }
}
