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
        event: 'mouseenter',
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
    const {onMouseEnter} = this.props

    onMouseEnter(layer, event)
  }

  onMouseLeave(layer, event) {
    const {onMouseLeave} = this.props

    onMouseLeave(layer, event)
  }

  render() {
    return null
  }
}

export default Events
