import React from 'react'
import PropTypes from 'prop-types'

import Filter from '../Filter'

class Facet extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    count: PropTypes.number,
    isActive: PropTypes.bool,
    addFilter: PropTypes.func,
    style: PropTypes.object
  }

  onClick = () => {
    const { name, value, addFilter } = this.props

    if (addFilter) {
      addFilter({ name, value })
    }
  }

  render() {
    const { name, value, count, isActive, style } = this.props

    if (isActive) {
      return null
    }

    return (
      <div style={style}>
        <Filter
          filter={{ name, value }}
          onClick={this.onClick}
          number={count}
          style={{ 'width': '100%' }}
        />
      </div>
    )
  }
}

export default Facet
