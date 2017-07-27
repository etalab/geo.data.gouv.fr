import React from 'react'
import PropTypes from 'prop-types'
import { Map, TileLayer, GeoJSON } from 'react-leaflet'


class CenteredMap extends React.PureComponent {
  static propTypes = {
    vectors: PropTypes.object.isRequired,
    className: PropTypes.string,
    frozen: PropTypes.bool,

    lat: PropTypes.number,
    lon: PropTypes.number,
    zoom: PropTypes.number
  }

  static defaultProps = {
    frozen: false,
    lat: 47,
    lon: 1,
    zoom: 5
  }

  componentDidMount() {
    if (this.vectors && this.map) {
      const bounds = this.vectors.leafletElement.getBounds()
      this.map.leafletElement.fitBounds(bounds)
    }
  }

  render() {
    const { vectors, className, frozen, lat, lon, zoom } = this.props

    return (
      <Map
        ref={map => { this.map = map }}
        className={className}
        center={[lat, lon]}
        zoom={zoom}
        dragging={!frozen}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        zoomControl={!frozen}
      >
        <TileLayer
          attribution='© Contributeurs <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url='https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png'
        />

        <GeoJSON
          color='blue'
          fillOpacity={0.1}
          weight={2}
          ref={vectors => { this.vectors = vectors }}
          data={vectors}
        />
      </Map>
    )
  }
}

export default CenteredMap
