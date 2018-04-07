/* eslint new-cap: off */
import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import {translate} from 'react-i18next'
import ReactMapboxGl from 'react-mapbox-gl'

import Leaflet from 'leaflet'
import leafletStyle from 'leaflet/dist/leaflet.css'

import ErrorWrapper from '../error-wrapper'

import Layers from './layers'
import PopUp from './pop-up'

const Mapbox = ReactMapboxGl({})
const mapStyle = 'https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json'

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

  constructor(props) {
    super(props)
    this.map = Mapbox
    this.state = {
      layer: null,
      layerCenter: null,
      layerZoom: null
    }
  }

  componentWillMount() {
    const {vectors} = this.props

    // Create a geoJson object with Leafet to get his bounds
    // It would be better to use Mapbox as in this example
    // https://github.com/alex3165/react-mapbox-gl/blob/9a4dd5ea1b560f36d22faa17b850738da11c8302/src/scale-control.tsx
    const bounds = Leaflet.geoJson(vectors).getBounds()
    this.bounds = [
      [bounds._southWest.lng, bounds._southWest.lat],
      [bounds._northEast.lng, bounds._northEast.lat]
    ]
  }

  onDrag = () => {
    const {layer} = this.state
    if (layer) {
      this.setState({layer: null})
    }
  }

  markerClick = event => {
    const coordinates = [event.lngLat.lng, event.lngLat.lat]
    this.setState({
      layerCenter: coordinates,
      layerZoom: [14],
      layer: event.features
    })
  }

  onToggleHover = event => {
    if (event.type === 'mouseenter') {
      event.map.getCanvas().style.cursor = 'pointer'
    } else {
      event.map.getCanvas().style.cursor = ''
    }
  }

  renderPopUp(features) {
    console.log(features);
    return (
      features.map((feature, key) => (
        <ul key={`feature-${key}`}>
          {Object.keys(feature.properties).map(key =>
            <li key={key}><b>{key} :</b> {feature.properties[key]}</li>
          )}
        </ul>
      ))
    )
  }

  render() {
    const {layer, layerCenter, layerZoom} = this.state
    const {vectors, frozen, lat, lon, zoom, t} = this.props

    return (
      <div>
        <ErrorWrapper message={t('errors.map')}>
          <Mapbox
            center={layerCenter || [lon, lat]}
            fitBounds={this.bounds}
            fitBoundsOptions={{padding: 20, linear: frozen}}
            zoom={layerZoom || [zoom]}
            onDrag={this.onDrag}
            style={mapStyle}
            flyToOptions={{speed: 0.8}}
            containerStyle={{
              height: '100%',
              width: '100%'
            }}
          >

            {layer &&
              <PopUp
                coordinates={layerCenter}
                features={layer}
                renderPopUp={this.renderPopUp}
                  />
            }

            <Layers
              data={vectors}
              markerClick={this.markerClick}
              onToggleHover={this.onToggleHover}
               />
          </Mapbox>
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
