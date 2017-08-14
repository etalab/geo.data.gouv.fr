import React from 'react'
import PropTypes from 'prop-types'
import { Map, TileLayer, GeoJSON } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

// Fix icon issues when importing images with webpack
// https://github.com/PaulLeCam/react-leaflet/issues/255
import L from 'leaflet'
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

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
    zoom: 4
  }

  componentDidMount() {
    if (this.vectors) {
      this.setState({
        bounds: this.vectors.leafletElement.getBounds()
      })
    }
  }

  render() {
    const { vectors, className, frozen, lat, lon, zoom } = this.props
    const { bounds } = this.state

    return (
      <Map
        className={className}
        center={[lat, lon]}
        bounds={bounds}
        minZoom={zoom}
        dragging={!frozen}
        scrollWheelZoom={false}
        doubleClickZoom={!frozen}
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
          ref={vectors => {
            this.vectors = vectors
          }}
          data={vectors}
        />
      </Map>
    )
  }
}

export default CenteredMap
