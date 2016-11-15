import React, { Component } from 'react'
import { forEach, sortBy } from 'lodash'
import FacetsGroup from './FacetsGroup'

const styles = {
  facets: {
    marginLeft: '2em',
  },
}

class Facets extends Component {
  render() {
    const { facets, filters, addFilter, removeFilter } = this.props
    if (!facets) return <div></div>

    const facetsArray = []
    forEach(facets, (value, key) => {
      const facet = {type: key, value}
      facetsArray.push(facet)
    })

    // TODO Sort by most useful facets
    const sorted = sortBy(facetsArray, 'type')

    return (
      <div style={styles.facets}>
        { sorted.map(facet => <FacetsGroup
          key={facet.type}
          type={facet.type}
          facets={facet.value}
          filters={filters}
          addFilter={addFilter}
          removeFilter={removeFilter} />) }
      </div>
    )
  }
}

export default Facets
