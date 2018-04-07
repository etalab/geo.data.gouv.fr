import React from 'react'
import PropTypes from 'prop-types'
import {GeoJSONLayer} from 'react-mapbox-gl'

const lineLayout = {
  'line-cap': 'round',
  'line-join': 'round'
}

const linePaint = {
  'line-color': '#4790E5',
  'line-width': 4
}

const fillPaint = {
  'fill-color': '#3099df',
  'fill-opacity': 0.2
}

const polygonPaint = {
  'fill-color': '#21ba45',
  'fill-outline-color': 'blue',
  'fill-opacity': 0.3
}

class Layers extends React.Component {
  constructor(props) {
    super(props)

    this.markerClick = this.markerClick.bind(this)
  }

  onHover(event) {
    const {onToggleHover} = this.props
    onToggleHover(event)
  }

  markerClick(event) {
    const {markerClick} = this.props
    markerClick(event)
  }

  getCirclePaint = () => {
    return {
      'circle-radius': 6,
      'circle-color': '#3099df',
      'circle-opacity': 0.6
    }
  }

  render() {
    const {data} = this.props

    return (
      <GeoJSONLayer
        data={data}
        lineLayout={lineLayout}
        linePaint={linePaint}
        fillPaint={fillPaint}
        polygonPaint={polygonPaint}
        circlePaint={this.getCirclePaint()}
        circleOnMouseDown={this.markerClick}
        circleOnMouseEnter={this.onHover}
        circleOnMouseLeave={this.onHover}
      />
    )
  }
}

Layers.propTypes = {
  data: PropTypes.object.isRequired,
  markerClick: PropTypes.func,
  onToggleHover: PropTypes.func
}

Layers.defaultProps = {
  markerClick: () => {},
  onToggleHover: () => {}
}

export default Layers
