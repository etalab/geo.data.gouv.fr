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
    const { style, name, value, count, addFilter, isActive } = this.props

    if (isActive) {
      return null
    }

    let onClick = null
    let filter = {name, value}

    if (addFilter) {
      onClick = () => addFilter(filter)
    }

    return (
      <div style={{...style, ...styles.facet}}>
        <span style={styles.facet}>
          <Filter filter={filter} onClick={onClick}/>
        </span>
        { count ? <span style={styles.count}>x&nbsp;{count}</span> : null }
      </div>
    )
  }
}

export default Facet
