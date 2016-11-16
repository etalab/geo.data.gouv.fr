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

    if (addFilter) {
      onClick = () => addFilter({name, value})
    }

    return (
      <div style={{...style, ...styles.facet}}>
        <span style={styles.facet}>
          <Filter filter={{value}} onClick={onClick}/>
        </span>
        <span style={styles.count}>x&nbsp;{count}</span>
      </div>
    )
  }
}

export default Facet
