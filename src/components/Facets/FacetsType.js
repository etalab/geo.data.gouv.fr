import React, { Component } from 'react'
import Facet from './Facet'

const styles = {
  type: {
    fontSize: '1.5em',
  },
}

class FacetsType extends Component {
  render() {
    const { type, facets, checkFilter, addFilter, removeFilter } = this.props

    return (
      <div>
        <div style={styles.type}>{type}</div>
        {facets.map((facet, idx) => <Facet
          key={idx}
          type={type}
          value={facet.value}
          count={facet.count}
          isActive={checkFilter({name: type, value: facet.value})}
          addFilter={addFilter}
          removeFilter={removeFilter} />)}
      </div>
    )
  }
}

export default FacetsType
