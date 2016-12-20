import React, { Component } from 'react'
import Filter from '../Filter/Filter'
import styles from './Facet.css'

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
      <div style={style} className={styles.container}>
        <Filter filter={filter} onClick={onClick}/>
        { count ? <span className={styles.count}>x&nbsp;{count}</span> : null }
      </div>
    )
  }
}

export default Facet
