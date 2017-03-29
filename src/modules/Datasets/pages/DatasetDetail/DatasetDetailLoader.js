import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'

import DatasetDetail from './DatasetDetail'

import ContentLoader from '../../../../components/Loader/ContentLoader'
import Errors from '../../../../components/Errors/Errors'

import { fetchDataset, fetchCatalogs, getDataGouvPublication } from '../../../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../../../helpers/components'

import { loader } from './DatasetDetail.css'

export default class DatasetDetailLoader extends Component {

  constructor(props) {
    super(props)
    this.state = {errors: []}
  }

  componentWillMount() {
    return Promise.all([
      this.updateDataset(),
      this.updateCatalogs(),
      this.updateDataGouvPublication(),
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

  updateDataGouvPublication() {
    return waitForDataAndSetState(getDataGouvPublication(this.props.params.datasetId), this, 'dataGouvPublication')
  }

  render() {
    const { dataset, catalogs, dataGouvPublication, errors } = this.state

    if (errors.length) return <Errors errors={errors} />

    if (!dataset || !catalogs) return <div className={loader}><ContentLoader /></div>

    return (
      <DocumentTitle title={dataset.metadata.title}>
        <DatasetDetail dataset={dataset} catalogs={catalogs} dataGouvPublication={dataGouvPublication} />
      </DocumentTitle>
    )
  }
}
