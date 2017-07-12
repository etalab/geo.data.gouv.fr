import React, { Component } from 'react'

import DatasetTable from '../DatasetTable/DatasetTable'
import PreviewMap from '../PreviewMap/PreviewMap'

import { visualizer, buttons, closeButton, active } from './Viewer.scss'

class Viewer extends Component {
  constructor(props) {
    super(props)
    this.state = { mode: 'map' }
  }

  changeMode(mode){
    this.setState({ mode })
  }

  closed() {

  }

  render() {
    const { mode } = this.state
    const { preview, geojson, closePreview, errors } = this.props

    if (!preview) return null

    if (mode === 'map') {
      return (
        <div className={visualizer}>
          <div className={buttons}>
            <button className={active}>Carte</button>
            <button onClick={() => this.changeMode('table')}>Tableau</button>
            <button className={closeButton} onClick={() => closePreview()}>X</button>
          </div>
          <PreviewMap
            distribution={preview.distribution}
            geojson={geojson}
            errors={errors}/>
        </div>
      )
    } else {
      return (
        <div className={visualizer}>
          <div className={buttons}>
            <button onClick={() => this.changeMode('map')}>Carte</button>
            <button className={active}>Tableau</button>
            <button className={closeButton} onClick={() => closePreview()}>X</button>
          </div>
          <DatasetTable geojson={geojson} />
        </div>
      )
    }
  }
}

export default Viewer
