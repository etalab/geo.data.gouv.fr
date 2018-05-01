import React from 'react'
import PropTypes from 'prop-types'
import mapboxGl, {Source, Layer} from 'react-mapbox-gl'
import bbox from '@turf/bbox'
import flip from '@turf/flip'

import {isBboxFlipped, flipBbox} from '../../lib/geo/bbox'

import Events from './events'
import Feature from './feature'

const mapStyle = 'https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json'

class CenteredMap extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    extent: PropTypes.object,
    frozen: PropTypes.bool
  }

  static defaultProps = {
    extent: null,
    frozen: false
  }

  state = {
    highlight: null
  }

  constructor(props) {
    super(props)

    this.MapComponent = mapboxGl({
      interactive: !props.frozen
    })

    // This is not in the state because we do not want to trigger
    // a re-render when we disable fitBounds.
    this.bbox = bbox(props.data)

    if (props.extent) {
      if (isBboxFlipped(this.bbox, bbox(props.extent))) {
        // Even though we should never mutate a component’s props,
        // flipped coordinates should also never appear.
        // We’re mutating the `data` prop here (and it is faster).

        flip(props.data, {mutate: true})
        this.bbox = flipBbox(this.bbox)
      }
    }
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
    const canvas = map.getCanvas()
    canvas.style.cursor = 'pointer'

    const [feature] = event.features

    this.setState({
      highlight: {
        feature,
        count: event.features.length
      }
    })
  }

  onMouseLeave = map => {
    const canvas = map.getCanvas()
    canvas.style.cursor = ''

    this.setState({
      highlight: null
    })
  }

  render() {
    const {MapComponent: Map} = this
    const {data, frozen} = this.props
    const {highlight} = this.state

    return (
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
        <Source id='data' geoJsonSource={{
          type: 'geojson',
          data
        }} />

        {highlight && (
          <Source id='highlight' geoJsonSource={{
            type: 'geojson',
            data: highlight.feature.geometry
          }} />
        )}

        {/* Point */}
        <Layer
          id='point'
          sourceId='data'
          type='circle'
          filter={['in', '$type', 'Point']}
          paint={{
            'circle-radius': 5,
            'circle-color': '#3099df',
            'circle-opacity': 0.6
          }}
        />

        {!frozen && highlight && (
          <Layer
            id='point-hover'
            sourceId='highlight'
            type='circle'
            filter={['in', '$type', 'Point']}
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
          sourceId='data'
          type='fill'
          filter={['==', '$type', 'Polygon']}
          paint={{
            'fill-color': '#3099df',
            'fill-opacity': 0.3
          }}
        />

        <Layer
          id='polygon-outline'
          sourceId='data'
          type='line'
          filter={['==', '$type', 'Polygon']}
          paint={{
            'line-color': '#4790E5',
            'line-width': 2
          }}
        />

        {!frozen && highlight && (
          <Layer
            id='polygon-hover'
            sourceId='highlight'
            type='fill'
            filter={['==', '$type', 'Polygon']}
            paint={{
              'fill-color': '#2c3e50',
              'fill-opacity': 0.3
            }}
          />
        )}

        {/* LineString */}
        <Layer
          id='line'
          sourceId='data'
          type='line'
          filter={['==', '$type', 'LineString']}
          paint={{
            'line-color': '#3099df',
            'line-width': 5,
            'line-opacity': 0.8
          }}
        />

        {!frozen && highlight && (
          <Layer
            id='line-hover'
            sourceId='highlight'
            type='line'
            filter={['==', '$type', 'LineString']}
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

        {highlight && (
          <div className='info'>
            <Feature feature={highlight.feature} otherFeaturesCount={highlight.count - 1} />
          </div>
        )}

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
      </Map>
    )
  }
}

export default CenteredMap
