import React from 'react'
import PropTypes from 'prop-types'
import { Map, TileLayer, GeoJSON } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

// Fix icon issues when importing images with webpack
// https://github.com/PaulLeCam/react-leaflet/issues/255
import Leaflet from 'leaflet'
delete Leaflet.Icon.Default.prototype._getIconUrl

Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

class CenteredMap extends React.Component {
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

  componentWillMount() {
    // We’re computing bounds only once: when the component will mount.
    // Whatever happens, GeoJSON will not re-render if the input data changes.
    // So we’re safe only computing once.
    this.bounds = Leaflet.geoJson(this.props.vectors).getBounds()
  }

  shouldComponentUpdate() {
    // As seen in componentWillMount, we do not need to re-render this component.
    // All the props are not going to change.
    // If we ever need this to re-render on prop changes, remove this method.
    return false
  }

  render() {
    const { vectors, className, frozen, lat, lon, zoom } = this.props

    return (
      <Map
        className={className}
        center={[lat, lon]}
        bounds={this.bounds}
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
          data={vectors}
        />
      </Map>
    )
  }
}

export default CenteredMap
