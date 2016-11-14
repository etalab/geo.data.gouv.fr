import React, { Component } from 'react'
import { fetchDataset, fetchCatalogs } from '../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components'
import CircularProgress from '../CircularProgress/CircularProgress'
import LinksSection from './LinksSection'
import DatasetSection from './DatasetSection'
import KeywordsSection from './KeywordsSection'
import CatalogsSection from './CatalogsSection'
import OrganizationsSection from './OrganizationsSection'

const styles = {
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

    if (!dataset || !catalogs) return <CircularProgress style={styles.loader}  size={2} />

    return (
      <div style={styles.container}>
        <DatasetSection dataset={dataset} />
        <div style={styles.sections}>
          <LinksSection links={dataset.metadata.links} />
          <KeywordsSection keywords={dataset.metadata.keywords} />
          <OrganizationsSection organizations={dataset.organizations} />
          <CatalogsSection catalogs={catalogs.filter(catalog => dataset.catalogs.includes(catalog.id))} />
        </div>
    </div>)
  }
}
