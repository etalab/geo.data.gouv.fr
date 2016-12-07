import React, { Component } from 'react'
import Download from './Download'
import Formats from './Formats'
import PreviewMap from '../Map/PreviewMap'
import { fetchGeoJSON } from '../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components'

const FORMATS = [
  {label: 'GeoJSON', format: 'GeoJSON', projection: 'WGS84'},
  {label: 'SHP/L93', format: 'SHP', projection: 'Lambert93'},
  {label: 'SHP/W84', format: 'SHP', projection: 'WGS84'},
  {label: 'KML', format: 'KML', projection: 'WGS84'},
  {label: 'CSV', format: 'CSV', projection: 'WGS84'},
]

const styles = {
  formats: {
    margin: '0.5em 0em 1em',
  },
  downloads: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  download: {
    flexWrap: 'wrap',
    margin: '5px',
    paddingLeft: '10px',
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
}

class DownloadDatasets extends Component {
  constructor(props) {
    super(props)
    this.state = {
      format: FORMATS[0], // GeoJSON
      preview: null,
      errors: [],
    }
  }

  selectFormat(format) {
    this.setState({format})
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
    let downloads

    if (!distributions.length) {
       downloads = <div>{'Aucune donnée n\'est téléchargeable.'}</div>
    } else {
      downloads =
          <div style={styles.downloads}>
            <div style={{flexGrow: 1}}>
              <div>Sélectionner un format de téléchargement :</div>
                <Formats style={styles.formats} active={format} changeFormat={(format) => this.selectFormat(format)} formats={FORMATS}/>
                  {this.props.distributions.map((distribution, idx) =>
                    <Download
                      style={styles.download}
                      key={idx}
                      distribution={distribution}
                      dlFormat={format}
                      isPreview={preview && preview.distribution._id === distribution._id}
                      preview={(preview) => this.selectPreview(preview)} />
                  )}
            </div>
            <PreviewMap
              distribution={preview ? preview.distribution : null}
              geojson={geojson}
              loading={preview && !geojson}
              errors={errors}/>
          </div>
    }

    return (
      <div style={style.section}>
        <h3 style={style.title}>Téléchargements</h3>
        {downloads}
      </div>
    )
  }
}

export default DownloadDatasets
