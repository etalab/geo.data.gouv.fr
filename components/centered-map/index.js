import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import mapboxGl, {Source, Layer} from 'react-mapbox-gl'
import bbox from '@turf/bbox'

import ErrorWrapper from '../error-wrapper'

import Events from './events'
import Feature from './feature'

const mapStyle = 'https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json'
const EMPTY_FILTER = ['==', 'non_existing_prop', 'non_existing_value']

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
    info: null
  }

  constructor(props) {
    super(props)

    this.MapComponent = mapboxGl({
      interactive: !props.frozen
    })

    // This is not in the state because we do not want to trigger
    // a re-render when we disable fitBounds.
    this.bbox = bbox(props.data)
  }

  componentDidMount() {
    this.bbox = null
  }

  getBounds = () => {
    const {bbox} = this

    if (bbox) {
      return [
        [bbox[0], bbox[1]],
        [bbox[2], bbox[3]]
      ]
    }
  }

  onMouseEnter = (map, layer, event) => {
    const canvas = event.originalEvent.target
    canvas.style.cursor = 'pointer'

    const [feature] = event.features

    const filter = ['all']
    for (const [key, value] of Object.entries(feature.properties)) {
      if (value && value !== 'null') {
        filter.push([
          '==',
          key,
          value
        ])
      }
    }

    map.setFilter(`${layer}-hover`, filter)

    this.setState({
      info: {
        feature,
        count: event.features.length
      }
    })
  }

  onMouseLeave = (map, layer, event) => {
    const canvas = event.originalEvent.target
    canvas.style.cursor = ''

    map.setFilter(`${layer}-hover`, EMPTY_FILTER)

    this.setState({
      info: null
    })
  }

  render() {
    const Map = this.MapComponent
    const {
      data, frozen,
      t
    } = this.props

    const {info} = this.state

    return (
      <ErrorWrapper message={t('errors.map')}>
        <Map
          fitBounds={this.getBounds()}
          fitBoundsOptions={{
            padding: 30,
            linear: true
          }}
          style={mapStyle} /* eslint-disable-line react/style-prop-object */
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

          {!frozen && (
            <Layer
              id='point-hover'
              sourceId='centered-map'
              type='circle'
              filter={EMPTY_FILTER}
              paint={{
                'circle-radius': 5,
                'circle-color': '#2c3e50',
                'circle-opacity': 0.8
              }}
            />
          )}

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

          {!frozen && (
            <Layer
              id='polygon-hover'
              sourceId='centered-map'
              type='fill'
              filter={EMPTY_FILTER}
              paint={{
                'fill-color': '#2c3e50',
                'fill-opacity': 0.3
              }}
            />
          )}

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

          {!frozen && (
            <Layer
              id='line-hover'
              sourceId='centered-map'
              type='line'
              filter={EMPTY_FILTER}
              paint={{
                'line-color': '#2c3e50',
                'line-width': 5,
                'line-opacity': 0.8
              }}
            />
          )}

          {!frozen && (
            <Events
              layers={['point', 'polygon', 'line']}
              onMouseEnter={this.onMouseEnter}
              onMouseLeave={this.onMouseLeave}
            />
          )}

          {info && (
            <div className='info'>
              <Feature feature={info.feature} otherFeaturesCount={info.count - 1} />
            </div>
          )}
        </Map>

        <style jsx>{`
          .info {
            position: absolute;
            pointer-events: none;
            top: 10px;
            left: 10px;
            max-width: 40%;
            overflow: hidden;
          }
        `}</style>
      </ErrorWrapper>
    )
  }
}

export default translate()(CenteredMap)
