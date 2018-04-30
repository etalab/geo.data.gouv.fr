import React from 'react'
import PropTypes from 'prop-types'

class Events extends React.PureComponent {
  static propTypes = {
    layers: PropTypes.arrayOf(PropTypes.string).isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired
  }

  static contextTypes = {
    map: PropTypes.object
  }

  constructor(props) {
    super(props)

    this.handlers = []

    for (const layer of props.layers) {
      this.handlers.push({
        event: 'mousemove',
        layer,
        handler: this.onMouseEnter.bind(this, layer)
      }, {
        event: 'mouseleave',
        layer,
        handler: this.onMouseLeave.bind(this, layer)
      })
    }
  }

  componentDidMount() {
    const {map} = this.context

    for (const {event, layer, handler} of this.handlers) {
      map.on(event, layer, handler)
    }
  }

  componentWillUnmount() {
    const {map} = this.context

    for (const {event, layer, handler} of this.handlers) {
      map.off(event, layer, handler)
    }
  }

  onMouseEnter(layer, event) {
    const {map} = this.context
    const {onMouseEnter} = this.props

    onMouseEnter(map, layer, event)
  }

  onMouseLeave(layer, event) {
    const {map} = this.context
    const {onMouseLeave} = this.props

    onMouseLeave(map, layer, event)
  }

  render() {
    return null
  }
}

export default Events
