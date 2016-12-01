import React, { Component } from 'react'
import Download from './Download'
import Formats from './Formats'

const FORMATS = {
  GeoJSON: {name: 'GeoJSON', projection: 'WGS84'},
  SHP: {name: 'SHP', projection: 'Lambert93'},
  KML: {name: 'KML', projection: 'WGS84'},
  CSV: {name: 'CSV', projection: 'WGS84'},
}

const styles = {
  formats: {
    marginTop: '2em',
  }
}

class DownloadDatasets extends Component {
  constructor(props) {
    super(props)
    this.state = { format: FORMATS.GeoJSON}
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
            {this.props.distributions.map((distribution, idx) =>
                <Download key={idx} distribution={distribution} dlFormat={this.state.format} />
              )}
            <Formats style={styles.formats} active={this.state.format} changeFormat={(format) => this.selectFormat(format)} formats={FORMATS}/>
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
