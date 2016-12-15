import React, { Component } from 'react'
import Download from './Download'
import Formats from './Formats'
import style from './VectorDownload.css'

const FORMATS = [
  {label: 'GeoJSON', format: 'GeoJSON', projection: 'WGS84'},
  {label: 'SHP/L93', format: 'SHP', projection: 'Lambert93'},
  {label: 'SHP/W84', format: 'SHP', projection: 'WGS84'},
  {label: 'KML', format: 'KML', projection: 'WGS84'},
  {label: 'CSV', format: 'CSV', projection: 'WGS84'},
]

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
    const { distributions, preview, choosePreview } = this.props

    if (!distributions.length) {
      return <div>{'Aucune donnée n\'est téléchargeable.'}</div>
    }

    return (
      <div>
        <div>Sélectionner un format de téléchargement :</div>
        <Formats className={style.formats} active={format} changeFormat={(format) => this.selectFormat(format)} formats={FORMATS}/>
        {distributions.map((distribution, idx) =>
          <Download
            key={idx}
            distribution={distribution}
            dlFormat={format}
            isPreview={preview && preview.distribution._id === distribution._id}
            display={preview ? preview.display : null}
            preview={(preview) => choosePreview(preview)} />
        )}
      </div>
    )
  }
}

export default VectorDownload
