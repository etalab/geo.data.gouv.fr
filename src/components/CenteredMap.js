import React, { Component } from 'react'
import { Map, TileLayer, GeoJSON } from 'react-leaflet'

const MAP = {
  lat: 47,
  lon: 1,
  zoom: 4,
  osmUrl: 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
  osmAttribution: '&copy; Contributeurs <a href="http://osm.org/copyright">OpenStreetMap</a>',
}

class CenteredMap extends Component {

  componentDidMount() {
    const { vectors, map } = this.refs

    if (vectors && map) {
      const bounds = vectors.leafletElement.getBounds()
      map.leafletElement.fitBounds(bounds)
    }
  }

  render() {
    const zoom = this.props.zoom || MAP.zoom
    const lat = this.props.lat || MAP.lat
    const lon = this.props.lon || MAP.lon

    const { vectors, className, frozen } = this.props

    return (
      <Map
        ref="map"
        className={className}
        center={[lat, lon]}
        zoom={zoom}
        dragging={!frozen}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        zoomControl={!frozen}
      >
        <TileLayer attribution={MAP.osmAttribution} url={MAP.osmUrl} />
        <GeoJSON color='blue' fillOpacity={0.1} weight={2} ref="vectors" data={vectors} />
      </Map>
    )
  }
}

export default CenteredMap
