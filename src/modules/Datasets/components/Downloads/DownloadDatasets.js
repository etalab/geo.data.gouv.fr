import React, { Component } from 'react'

import VectorDownload from '../Downloads/VectorDownload'
import OtherDownload from '../Downloads/OtherDownload'
import DatasetTable from '../DatasetTable/DatasetTable'
import PreviewMap from '../PreviewMap/PreviewMap'

import { fetchGeoJSON } from '../../../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../../../helpers/components'
import { content, vector } from './DownloadDatasets.css';

class DownloadDatasets extends Component {
  constructor(props) {
    super(props)
    this.state = {
      preview: null,
      errors: [],
    }
  }

  selectPreview(preview) {
    this.setState({geojson: null, errors: [], preview})
    return waitForDataAndSetState(fetchGeoJSON(preview.link), this, 'geojson')
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  render() {
    const { distributions } = this.props
    const { format, preview, geojson, errors } = this.state
    const vectorDistributions = distributions.filter(distribution => !distribution.originalDistribution)
    const otherDistributions = distributions.filter(distribution => distribution.originalDistribution === true)

    const map = (preview && preview.display === 'map') ?
      <PreviewMap
        distribution={preview.distribution}
        geojson={geojson}
        loading={preview && !geojson}
        errors={errors}/>
      : null

    const table = (preview && preview.display === 'table') ?
      <DatasetTable features={geojson ? geojson.features : []} />
      : null

    const otherDownload = (otherDistributions.length) ? <OtherDownload distributions={otherDistributions} /> : null
    const vectorDownload = <VectorDownload distributions={vectorDistributions} format={format}
      choosePreview={(format) => this.selectPreview(format)} preview={preview} />

    return (
      <div className={content}>
        <div className={vector}>
          <h3>Téléchargements</h3>
          <h4>Données vectorielles</h4>
          {vectorDownload}
          {otherDownload}
        </div>

        {map}
        {table}
      </div>
    )
  }
}

export default DownloadDatasets
