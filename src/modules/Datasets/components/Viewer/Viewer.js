import React, { Component } from 'react'

import DatasetTable from '../DatasetTable/DatasetTable'
import PreviewMap from '../PreviewMap/PreviewMap'

import { visualizer, buttons } from './Viewer.css'

class Viewer extends Component {
  constructor(props) {
    super(props)
    this.state = { mode: 'map' }
  }

  changeMode(mode){
    this.setState({ mode })
  }

  render() {
    const { mode } = this.state
    const { preview, geojson, errors } = this.props

    if (!preview) return null

    if (mode === 'map') {
      return (
        <div className={visualizer}>
          <PreviewMap
            distribution={preview.distribution}
            geojson={geojson}
            errors={errors}/>
          <div className={buttons}>
            <button disabled>Carte</button>
            <button onClick={() => this.changeMode('table')}>Tableau</button>
          </div>
        </div>
      )
    } else {
      return (
        <div className={visualizer}>
          <DatasetTable geojson={geojson} />
          <div className={buttons}>
            <button onClick={() => this.changeMode('map')}>Carte</button>
            <button disabled>Tableau</button>
          </div>
        </div>
      )
    }
  }
}

export default Viewer
