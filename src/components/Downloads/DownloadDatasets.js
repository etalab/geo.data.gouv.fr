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
  }
}

class DownloadDatasets extends Component {
  constructor(props) {
    super(props)
    this.state = { format: FORMATS[0]} // GeoJSON
  }

  selectFormat(format) {
    this.setState({format})
  }

  render() {
    const { distributions } = this.props
    let downloads

    if (!distributions.length) {
       downloads = <div>{'Aucune donnée n\'est téléchargeable.'}</div>
    } else {
      downloads =
          <div>
            <div>Sélectionner un format de téléchargement :</div>
            <Formats style={styles.formats} active={this.state.format} changeFormat={(format) => this.selectFormat(format)} formats={FORMATS}/>
            {this.props.distributions.map((distribution, idx) =>
                <Download key={idx} distribution={distribution} dlFormat={this.state.format} />
              )}
          </div>
    }

    return (
      <div>
        <h1>Téléchargements</h1>
        {downloads}
      </div>
    )
  }
}

export default DownloadDatasets
