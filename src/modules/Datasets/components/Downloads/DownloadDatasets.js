import React, { Component } from 'react'

import VectorDownload from '../Downloads/VectorDownload'
import OtherDownload from '../Downloads/OtherDownload'
import Viewer from '../Viewer/Viewer'

import { fetchGeoJSON } from '../../../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../../../helpers/components'
import { content, vector } from './DownloadDatasets.css';

class DownloadDatasets extends Component {
  constructor(props) {
    super(props)
    this.state = {
      preview: null,
      geojson: null,
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
    const { preview, geojson, errors } = this.state
    const vectorDistributions = distributions.filter(distribution => !distribution.originalDistribution)
    const otherDistributions = distributions.filter(distribution => distribution.originalDistribution === true)

    const otherDownload = (otherDistributions.length) ? <OtherDownload distributions={otherDistributions} /> : null
    const vectorDownload = <VectorDownload distributions={vectorDistributions} choosePreview={(format) => this.selectPreview(format)} preview={preview} />

    return (
      <div className={content}>
        <div className={vector}>
          <h4>Données vectorielles</h4>
          {vectorDownload}
          {otherDownload}
        </div>
        <Viewer
          preview={preview}
          geojson={geojson}
          errors={errors} />
      </div>
    )
  }
}

export default DownloadDatasets
