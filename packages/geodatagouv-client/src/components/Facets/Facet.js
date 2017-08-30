import React from 'react'
import PropTypes from 'prop-types'

import Filter from '../Filter'

import styles from './Facet.scss'

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
      <div style={style} className={styles.container}>
        <Filter
          filter={{ name, value }}
          onClick={this.onClick}
        />
        {count && (
          <span className={styles.count}>x {count}</span>
        )}
      </div>
    )
  }
}

export default Facet
