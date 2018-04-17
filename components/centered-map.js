import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import {translate} from 'react-i18next'
import {Map, TileLayer, GeoJSON} from 'react-leaflet'

import Leaflet from 'leaflet'
import leafletStyle from 'leaflet/dist/leaflet.css'

import ErrorWrapper from './error-wrapper'

Leaflet.Icon.Default.imagePath = '/static/images/leaflet/'

class CenteredMap extends React.PureComponent {
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

  render() {
    const {vectors, frozen, lat, lon, zoom, t} = this.props

    const bounds = Leaflet.geoJson(vectors).getBounds()

    return (
      <div>
        <ErrorWrapper message={t('errors.map')}>
          <Map
            center={[lat, lon]}
            bounds={bounds}
            minZoom={zoom}
            dragging={!frozen}
            touchZoom={!frozen}
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
          {/* eslint-disable react/no-danger */}
          <style dangerouslySetInnerHTML={{__html: leafletStyle}} />
          {/* eslint-enable react/no-danger */}
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
