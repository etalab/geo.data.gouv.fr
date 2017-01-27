import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'

import LinksSection from '../../components/LinksSection/LinksSection'
import DatasetSection from '../../components/DatasetSection/DatasetSection'
import DatasetChecklist from '../../components/DatasetChecklist/DatasetChecklist'
import DownloadDatasets from '../../components/Downloads/DownloadDatasets'
import FiltersSection from '../../components/FiltersSection/FiltersSection'

import ContentLoader from '../../../../components/Loader/ContentLoader'
import Errors from '../../../../components/Errors/Errors'

import { fetchDataset, fetchCatalogs } from '../../../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../../../helpers/components'

import { loader, container, section } from './DatasetDetail.css'

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
    const { dataset, catalogs, errors } = this.state

    if (errors.length) return <Errors errors={errors} />

    if (!dataset || !catalogs) return <div className={loader}><ContentLoader /></div>

    return (
      <DocumentTitle title={dataset.metadata.title}>
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
      </DocumentTitle>
    )
  }
}
