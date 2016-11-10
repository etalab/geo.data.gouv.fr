import React, { Component } from 'react'
import { theme } from '../../tools'

class Facet extends Component {

  filter() {
    const { type, value, isActive, addFilter, removeFilter } = this.props
    const filter = {name: type, value}

    return isActive ? removeFilter(filter) : addFilter(filter)
  }

  render() {
    const { value, count, isActive } = this.props
    const styles = {
      facet: {
        display: 'flex',
        backgroundColor: isActive ? theme.green : undefined,
      },
      count: {
        margin: '0.2em',
        backgroundColor: theme.blue,
      },
    }

    return (
      <div style={styles.facet} onClick={() => this.filter()}>
        {value}
        <div style={styles.count}>{count}</div>
      </div>
    )
  }
}

export default Facet
