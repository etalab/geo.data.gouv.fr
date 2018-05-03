import React from 'react'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl'
import bbox from '@turf/bbox'
import flip from '@turf/flip'

import mapStyle from 'mapbox-gl/dist/mapbox-gl.css'

import {isBboxFlipped, flipBbox} from '../../lib/geo/bbox'

import Feature from './feature'

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

    this.handlers = []

    if (!props.frozen) {
      for (const layer of ['point', 'polygon-fill', 'line']) {
        this.handlers.push({
          event: 'mousemove',
          layer,
          handler: this.onMouseMove.bind(this, layer)
        }, {
          event: 'mouseleave',
          layer,
          handler: this.onMouseLeave.bind(this, layer)
        })
      }
    }
  }

  componentDidMount() {
    const {frozen} = this.props

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json',
      interactive: !frozen
    })

    this.map.once('load', this.onLoad)

    this.map.fitBounds(this.bbox, {
      padding: 30,
      linear: true,
      duration: 0
    })

    for (const {event, layer, handler} of this.handlers) {
      this.map.on(event, layer, handler)
    }
  }

  componentWillUnmount() {
    const {map} = this

    for (const {event, layer, handler} of this.handlers) {
      map.off(event, layer, handler)
    }
  }

  onLoad = () => {
    const {map} = this
    const {data} = this.props

    map.addSource('data', {
      type: 'geojson',
      data
    })

    map.addSource('hover', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    })

    map.addLayer({
      id: 'point',
      type: 'circle',
      source: 'data',
      paint: {
        'circle-radius': 5,
        'circle-color': '#3099df',
        'circle-opacity': 0.6
      },
      filter: ['==', '$type', 'Point']
    })

    map.addLayer({
      id: 'point-hover',
      type: 'circle',
      source: 'hover',
      paint: {
        'circle-radius': 5,
        'circle-color': '#2c3e50',
        'circle-opacity': 0.8
      },
      filter: ['==', '$type', 'Point']
    })

    map.addLayer({
      id: 'polygon-fill',
      type: 'fill',
      source: 'data',
      paint: {
        'fill-color': '#3099df',
        'fill-opacity': 0.3
      },
      filter: ['==', '$type', 'Polygon']
    })

    map.addLayer({
      id: 'polygon-fill-hover',
      type: 'fill',
      source: 'hover',
      paint: {
        'fill-color': '#2c3e50',
        'fill-opacity': 0.3
      },
      filter: ['==', '$type', 'Polygon']
    })

    map.addLayer({
      id: 'polygon-outline',
      type: 'line',
      source: 'data',
      paint: {
        'line-color': '#4790E5',
        'line-width': 2
      },
      filter: ['==', '$type', 'Polygon']
    })

    map.addLayer({
      id: 'line',
      type: 'line',
      source: 'data',
      paint: {
        'line-color': '#3099df',
        'line-width': 5,
        'line-opacity': 0.8
      },
      filter: ['==', '$type', 'LineString']
    })

    map.addLayer({
      id: 'line-hover',
      type: 'line',
      source: 'hover',
      paint: {
        'line-color': '#2c3e50',
        'line-width': 5,
        'line-opacity': 0.8
      },
      filter: ['==', '$type', 'LineString']
    })
  }

  onMouseMove = (layer, event) => {
    const {map} = this
    const canvas = map.getCanvas()
    canvas.style.cursor = 'pointer'

    const [feature] = event.features

    map.getSource('hover').setData({
      type: 'FeatureCollection',
      features: [feature]
    })

    this.setState({
      highlight: {
        feature,
        count: event.features.length
      }
    })
  }

  onMouseLeave = () => {
    const {map} = this
    const canvas = map.getCanvas()
    canvas.style.cursor = ''

    map.getSource('hover').setData({
      type: 'FeatureCollection',
      features: []
    })
  }

  render() {
    const {highlight} = this.state

    return (
      <div className='container'>
        <div ref={el => {
          this.mapContainer = el
        }} className='container' />

        {highlight && (
          <div className='info'>
            <Feature feature={highlight.feature} otherFeaturesCount={highlight.count - 1} />
          </div>
        )}

        <style
          dangerouslySetInnerHTML={{__html: mapStyle}} // eslint-disable-line react/no-danger
        />
        <style jsx>{`
          .container {
            position: relative;
            height: 100%;
            width: 100%;
          }

          .info {
            position: absolute;
            pointer-events: none;
            top: 10px;
            left: 10px;
            max-width: 40%;
            overflow: hidden;
          }
        `}</style>
      </div>
    )
  }
}

export default CenteredMap
