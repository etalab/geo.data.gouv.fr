import React, { Component } from 'react'
import { Map, TileLayer, Polygon } from 'react-leaflet'

import styles from './SpatialExtentMap.css'

const MAP = {
  latitude: 47,
  longitude: 1,
  zoom: 4,
  osmUrl: 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
  osmAttribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}

class SpatialExtentMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: MAP.latitude,
      lng: MAP.longitude,
      zoom: MAP.zoom,
    }
  }

  componentDidMount() {
    this.setState({mount: true})
  }

  componentDidUpdate() {
    const { vectors, spatialMap } = this.refs

    if (vectors && spatialMap) {
      const bounds = vectors.leafletElement.getBounds()
      spatialMap.leafletElement.fitBounds(bounds)
    }
  }

  render() {
    const { zoom, lat, lng } = this.state
    const { polygon } = this.props
    const position = [lat, lng]

    return (
      <div className={styles.container}>
        <Map ref="spatialMap" className={styles.map} center={position} zoom={zoom}>
          <TileLayer attribution={MAP.osmAttribution} url={MAP.osmUrl} />
          <Polygon color='blue' ref="vectors" positions={polygon} />
        </Map>
      </div>
    )
  }
}

export default SpatialExtentMap
