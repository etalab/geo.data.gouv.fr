import React, { Component } from 'react'
import { fetchDataset, fetchCatalogs } from '../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components'
import ContentLoader from '../Loader/ContentLoader'
import LinksSection from './LinksSection'
import DatasetSection from './DatasetSection'
import DatasetChecklist from './DatasetChecklist'
import DownloadDatasets from '../Downloads/DownloadDatasets'
import FiltersSection from '../Filter/FiltersSection'
import { theme } from '../../tools'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: '5em',
  },
  section: {
    paddingTop: '2em',
    paddingBottom: '2em',
    backgroundColor: 'white',
    padding: '2em',
    marginBottom: '2em',
    boxShadow: theme.boxShadowZ1,
  },
  title: {
    fontSize: '1.2em',
    fontWeight: 400,
    marginBottom: '1em',
  },
  loader: {
    textAlign: 'center',
    marginTop: '5em',
  },
}

export default class DatasetDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {errors: []}
  }

  componentWillMount() {
    return Promise.all([
      this.updateDataset(),
      this.updateCatalogs(),
    ])
  }
  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  updateDataset() {
    return waitForDataAndSetState(fetchDataset(this.props.params.datasetId), this, 'dataset')
  }

  updateCatalogs() {
    return waitForDataAndSetState(fetchCatalogs(), this, 'catalogs')
  }

  render() {
    const { dataset, catalogs } = this.state

    if (!dataset || !catalogs) return <div style={styles.loader}><ContentLoader /></div>

    return (
      <div style={styles.container}>
        <DatasetSection style={styles} dataset={dataset} />
        <FiltersSection style={styles} keywords={dataset.metadata.keywords} organizations={dataset.organizations} catalogs={catalogs.filter(catalog => dataset.catalogs.includes(catalog.id))} />
        <DatasetChecklist style={styles} dataset={dataset} />
        <DownloadDatasets style={styles} distributions={dataset.dataset.distributions} />
        <LinksSection style={styles} links={dataset.metadata.links} />
    </div>)
  }
}
