import React, { Component } from 'react'
import PreviewMap from '../Map/PreviewMap'
import VectorDownload from '../Downloads/VectorDownload'
import OtherDownload from '../Downloads/OtherDownload'
import { fetchGeoJSON } from '../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components'
import DatasetTable from '../Table/DatasetTable'

const styles = {
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    overflowX: 'scroll',
  },
  vector: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '50px',
  },
}

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
    const { distributions, style } = this.props
    const { format, preview, geojson, errors } = this.state
    const vectorDistributions = distributions.filter(distribution => !distribution.originalDistribution)
    const otherDistributions = distributions.filter(distribution => distribution.originalDistribution === true)

    let map
    let table

    if (preview && preview.display === 'map') {
      map = <PreviewMap
        distribution={preview.distribution}
        geojson={geojson}
        loading={preview && !geojson}
        errors={errors}/>

    }

    if (preview && preview.display === 'table') {
      table = <DatasetTable features={geojson ? geojson.features : []} />
    }

    return (
      <div style={style.section}>
        <h3 style={style.title}>Téléchargements</h3>
        <div style={styles.content}>
          <div style={{flexGrow: 1, maxWidth: '60%'}}>
            <VectorDownload
              style={styles.vector}
              distributions={vectorDistributions}
              format={format}
              choosePreview={(format) => this.selectPreview(format)}
              preview={preview} />
            {otherDistributions.length ? <OtherDownload distributions={otherDistributions} /> : null}
          </div>
          {map}
          {table}
          {!map && !table ? <div style={{width: '40%'}}></div> : null}
        </div>
      </div>
    )
  }
}

export default DownloadDatasets
