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
  render() {
    const { name, value, count, addFilter, isActive } = this.props

    if (isActive) {
      return null
    }

    return (
      <div style={styles.facet}>
        <span style={styles.facet}>
          <Filter filter={{value}} onClick={() => addFilter({name, value})}/>
        </span>
        <span style={styles.count}>x&nbsp;{count}</span>
      </div>
    )
  }
}

export default Facet
