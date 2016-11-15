import React, { Component } from 'react'
import Filter from '../Filter/Filter'

const styles = {
  count: {
    color: '#777',
    fontSize: '12px',
  },
  facet: {
    display: 'flex',
    alignItems: 'center',
  },
}

class Facet extends Component {

  filter() {
    const { type, value, isActive, addFilter, removeFilter } = this.props
    const filter = {name: type, value}

    return isActive ? removeFilter(filter) : addFilter(filter)
  }

  render() {
    const { value, count } = this.props

    return (
      <div style={styles.facet}>
        <span style={styles.facet}>
          <Filter value={value} onClick={() => this.filter()}/>
        </span>
        <span style={styles.count}>x&nbsp;{count}</span>
      </div>
    )
  }
}

export default Facet
