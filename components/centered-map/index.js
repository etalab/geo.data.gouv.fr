import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import mapboxGl, {GeoJSONLayer, Popup} from 'react-mapbox-gl'
import {bbox} from '@turf/turf'

import ErrorWrapper from '../error-wrapper'

import Feature from './feature'

const mapStyle = 'https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json'

class CenteredMap extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    frozen: PropTypes.bool,

    lineLayout: PropTypes.object,
    linePaint: PropTypes.object,
    fillPaint: PropTypes.object,
    polygonPaint: PropTypes.object,
    circlePaint: PropTypes.object,

    t: PropTypes.func.isRequired
  }

  static defaultProps = {
    frozen: false,

    lineLayout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    linePaint: {
      'line-color': '#4790E5',
      'line-width': 2
    },
    fillPaint: {
      'fill-color': '#3099df',
      'fill-opacity': 0.2
    },
    polygonPaint: {
      'fill-color': '#21ba45',
      'fill-outline-color': 'blue',
      'fill-opacity': 0.3
    },
    circlePaint: {
      'circle-radius': 5,
      'circle-color': '#3099df',
      'circle-opacity': 0.6
    }
  }

  constructor(props) {
    super(props)

    this.MapComponent = mapboxGl({
      interactive: !props.frozen
    })

    this.initialRender = true

    this.state = {
      bbox: bbox(props.data),
      marker: null
    }
  }

  componentDidMount() {
    this.initialRender = false
  }

  componentWillReceiveProps(newProps) {
    const {data} = this.props

    if (data !== newProps.data) {
      this.initialRender = true

      this.setState({
        bbox: bbox(newProps.data)
      })
    }
  }

  onToggleHover = event => {
    const canvas = event.target.getCanvas()

    if (event.type === 'mouseenter') {
      canvas.style.cursor = 'pointer'

      const [feature] = event.features
      const coordinates = feature.geometry.coordinates.slice()

      this.setState({
        marker: {
          feature,
          coordinates,
          count: event.features.length
        }
      })
    } else {
      canvas.style.cursor = ''

      this.setState({
        marker: null
      })
    }
  }

  render() {
    const Map = this.MapComponent
    const {
      data, frozen,
      lineLayout, linePaint, fillPaint, polygonPaint, circlePaint,
      t
    } = this.props
    const {bbox, marker} = this.state

    const bounds = [
      [bbox[0], bbox[1]],
      [bbox[2], bbox[3]]
    ]

    return (
      <ErrorWrapper message={t('errors.map')}>
        <Map
          fitBounds={this.initialRender && bounds}
          fitBoundsOptions={{padding: 30, linear: true}}
          style={mapStyle} /* eslint-disable-line react/style-prop-object */
          flyToOptions={{speed: 0.8}}
          containerStyle={{
            height: '100%',
            width: '100%'
          }}
        >

          {marker && (
            <Popup coordinates={marker.coordinates}>
              <Feature feature={marker.feature} otherFeaturesCount={marker.count - 1} />
            </Popup>
          )}

          <GeoJSONLayer
            data={data}
            lineLayout={lineLayout}
            linePaint={linePaint}
            fillPaint={fillPaint}
            polygonPaint={polygonPaint}
            circlePaint={circlePaint}
            circleOnMouseEnter={!frozen && this.onToggleHover}
            circleOnMouseLeave={!frozen && this.onToggleHover}
          />
        </Map>
      </ErrorWrapper>
    )
  }
}

export default translate()(CenteredMap)
