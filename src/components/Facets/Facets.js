import React, { Component } from 'react'
import { forEach } from 'lodash'
import FacetsType from './FacetsType'

const styles = {
  facets: {
    margin: '2em',
  },
}

class Facets extends Component {
  render() {
    const { facets, checkFilter, addFilter, removeFilter } = this.props
    if (!facets) return <div></div>

    let facetsArray = []
    forEach(facets, function(value, key) {
      facetsArray.push(<FacetsType
        key={key}
        type={key}
        facets={value}
        checkFilter={checkFilter}
        addFilter={addFilter}
        removeFilter={removeFilter} />)
    })

    return (
      <div>
        <h1>Facets</h1>
        {facetsArray.map((facet, idx) => <div style={styles.facets} key={idx}>{facet}</div>)}
      </div>
    )
  }
}

export default Facets
