import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import mapboxGl, {Source, Layer, Popup} from 'react-mapbox-gl'
import bbox from '@turf/bbox'

import ErrorWrapper from '../error-wrapper'

import Events from './events'
import Feature from './feature'

const mapStyle = 'https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json'

class CenteredMap extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    frozen: PropTypes.bool,

    t: PropTypes.func.isRequired
  }

  static defaultProps = {
    frozen: false
  }

  state = {
    marker: null
  }

  constructor(props) {
    super(props)

    this.MapComponent = mapboxGl({
      interactive: !props.frozen
    })
  }

  onInitialLoad = map => {
    const {data} = this.props

    map.fitBounds(bbox(data), {
      padding: 30,
      linear: true
    })
  }

  onMouseEnter = (layer, event) => {
    const canvas = event.originalEvent.target
    canvas.style.cursor = 'pointer'

    let coordinates = event.lngLat
    const [feature] = event.features

    if (layer === 'point') {
      coordinates = feature.geometry.coordinates.slice()
    }

    this.setState({
      marker: {
        feature,
        coordinates,
        count: event.features.length
      }
    })
  }

  onMouseLeave = (layer, event) => {
    const canvas = event.originalEvent.target
    canvas.style.cursor = ''

    this.setState({
      marker: null
    })
  }

  render() {
    const Map = this.MapComponent
    const {
      data, frozen,
      t
    } = this.props
    const {marker} = this.state

    return (
      <ErrorWrapper message={t('errors.map')}>
        <Map
          style={mapStyle} /* eslint-disable-line react/style-prop-object */
          flyToOptions={{speed: 0.8}}
          containerStyle={{
            height: '100%',
            width: '100%'
          }}
        >
          <Source id='centered-map' geoJsonSource={{
            type: 'geojson',
            data
          }} />

          {/* Point */}
          <Layer
            id='point'
            sourceId='centered-map'
            type='circle'
            filter={['in', '$type', 'Point']}
            paint={{
              'circle-radius': 5,
              'circle-color': '#3099df',
              'circle-opacity': 0.6
            }}
          />

          {/* Polygon */}
          <Layer
            id='polygon'
            sourceId='centered-map'
            type='fill'
            filter={['==', '$type', 'Polygon']}
            paint={{
              'fill-color': '#3099df',
              'fill-opacity': 0.3
            }}
          />

          <Layer
            id='polygon-outline'
            sourceId='centered-map'
            type='line'
            filter={['==', '$type', 'Polygon']}
            paint={{
              'line-color': '#4790E5',
              'line-width': 2
            }}
          />

          {/* LineString */}
          <Layer
            id='line'
            sourceId='centered-map'
            type='line'
            filter={['==', '$type', 'LineString']}
            paint={{
              'line-color': '#3099df',
              'line-width': 5,
              'line-opacity': 0.8
            }}
          />

          <Events
            frozen={frozen}
            layers={['point', 'polygon', 'line']}
            onInitialLoad={this.onInitialLoad}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
          />

          {marker && (
            <Popup coordinates={marker.coordinates}>
              <Feature feature={marker.feature} otherFeaturesCount={marker.count - 1} />
            </Popup>
          )}
        </Map>
      </ErrorWrapper>
    )
  }
}

export default translate()(CenteredMap)
