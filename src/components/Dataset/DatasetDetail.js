import React, { Component } from 'react'
import { fetchDataset, fetchCatalogs } from '../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components'
import ContentLoader from '../Loader/ContentLoader'
import LinksSection from './LinksSection'
import DatasetSection from './DatasetSection'
import DatasetChecklist from './DatasetChecklist'
import DownloadDatasets from '../Downloads/DownloadDatasets'
import FiltersSection from '../Filter/FiltersSection'
import { loader, container, section } from './DatasetDetail.css'

export default class DatasetDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {errors: []}
  }

  componentDidMount() {
    document.title = 'Fiche jeu de données'
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

    if (!dataset || !catalogs) return <div className={loader}><ContentLoader /></div>

    return (
      <div className={container}>
        <DatasetSection dataset={dataset} />

        <div className={section}>
          <FiltersSection keywords={dataset.metadata.keywords} organizations={dataset.organizations} catalogs={catalogs.filter(catalog => dataset.catalogs.includes(catalog._id))} />
        </div>

        <div className={section}>
          <DatasetChecklist dataset={dataset} />
        </div>

        <div className={section}>
          <DownloadDatasets distributions={dataset.dataset.distributions} />
        </div>

        <div className={section}>
          <LinksSection links={dataset.metadata.links} />
        </div>
      </div>
    )
  }
}
