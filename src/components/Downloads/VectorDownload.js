import React, { Component } from 'react'
import Download from './Download'
import Formats from './Formats'

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
  vector: {
    flexGrow: 1,
    marginRight: '5%',
  },
  download: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '2px',
    paddingLeft: '10px',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
}

class VectorDownload extends Component {
  constructor(props) {
    super(props)
    this.state = { format: FORMATS[0] } // GeoJSON
  }

  selectFormat(format) {
    this.setState({format})
  }

  render() {
    const { format } = this.state
    const { distributions, preview, choosePreview, style } = this.props

    let content
    if (!distributions.length) {
      content = <div>{'Aucune donnée n\'est téléchargeable.'}</div>
    } else {
      content = <div>
                  <div>Sélectionner un format de téléchargement :</div>
                  <Formats style={styles.formats} active={format} changeFormat={(format) => this.selectFormat(format)} formats={FORMATS}/>
                  {distributions.map((distribution, idx) =>
                    <Download
                      style={styles.download}
                      key={idx}
                      distribution={distribution}
                      dlFormat={format}
                      isPreview={preview && preview.distribution._id === distribution._id}
                      preview={(preview) => choosePreview(preview)} />
                  )}
                </div>
    }

    return (
      <div style={style}>
        <div style={styles.vector}>
          <h3>Données vectorielles</h3>
          {content}
        </div>
      </div>
    )
  }
}

export default VectorDownload
