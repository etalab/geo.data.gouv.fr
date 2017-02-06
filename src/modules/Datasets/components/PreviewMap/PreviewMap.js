import React, { Component } from 'react'
import { Map, TileLayer, GeoJSON } from 'react-leaflet'

import ContentLoader from '../../../../components/Loader/ContentLoader'

import styles from './PreviewMap.css'

const MAP = {
  latitude: 47,
  longitude: 1,
  zoom: 5.5,
  osmUrl: 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
  osmAttribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}

const styleLoader = {
    width: '6em',
    height: '6em',
    top: '46%',
    left: '50%',
    borderWidth: '10px'
}

class PreviewMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: MAP.latitude,
      lng: MAP.longitude,
      zoom: MAP.zoom,
    }
  }

  componentDidUpdate() {
    const { vectors, map } = this.refs

    if (vectors && map) {
      const bounds = vectors.leafletElement.getBounds()
      map.leafletElement.fitBounds(bounds)
    }
  }

  render() {
    const { geojson, distribution } = this.props
    const position = [this.state.lat, this.state.lng]
    const errors = [...this.props.errors]

    if (geojson && (!geojson.features || geojson.features.length === 0)) {
      errors.push('Les données sont vides')
    }

    const err = (
      <div className={styles.errors}>
        <strong>Une erreur est survenue lors du chargement de {distribution && (distribution.typeName || distribution.layer)}</strong>
        <br/>{errors}
      </div>
    )

    const loader = !geojson && !errors.length ? (
      <div className={styles.load}>
        <ContentLoader style={styleLoader} />
      </div>
    ) : null

    return (
      <div className={styles.container}>
        {errors.length ? err : null}
        {loader}
        <Map ref="map" className={styles.map} center={position} zoom={this.state.zoom} >
          <TileLayer attribution={MAP.osmAttribution} url={MAP.osmUrl} />
          {geojson && !errors.length ? <GeoJSON ref="vectors" data={geojson} /> : null}
        </Map>
      </div>
    )
  }
}

export default PreviewMap
