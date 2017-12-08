import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { translate } from 'react-i18next'
import { Map, TileLayer, GeoJSON } from 'react-leaflet'

import Leaflet from 'leaflet'
import leafletStyle from 'leaflet/dist/leaflet.css'

import ErrorWrapper from './error-wrapper'

Leaflet.Icon.Default.imagePath = '/static/images/leaflet/'

class CenteredMap extends React.Component {
  static propTypes = {
    vectors: PropTypes.object.isRequired,
    frozen: PropTypes.bool,

    lat: PropTypes.number,
    lon: PropTypes.number,
    zoom: PropTypes.number,

    t: PropTypes.func.isRequired
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
    const { vectors, frozen, lat, lon, zoom, t } = this.props

    return (
      <div>
        <ErrorWrapper message={t('errors.map')}>
          <Map
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
        </ErrorWrapper>

        <Head>
          <style dangerouslySetInnerHTML={{ __html: leafletStyle }} />
        </Head>
        <style jsx>{`
          div {
            height: 100%;

            :global(.leaflet-container) {
              height: 100%;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default translate()(CenteredMap)
