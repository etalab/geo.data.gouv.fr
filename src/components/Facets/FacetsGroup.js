import React, { Component } from 'react'
import Facet from './Facet'
import { isActive } from '../../helpers/manageFilters'

const styles = {
  type: {
    fontSize: '1.5em',
  },
}

class FacetsGroup extends Component {
  render() {
    const { type, facets, filters, addFilter, removeFilter } = this.props

    return (
      <div>
        <div style={styles.type}>{type}</div>
        {facets.map((facet, idx) => <Facet
          key={idx}
          type={type}
          value={facet.value}
          count={facet.count}
          isActive={isActive(filters, {name: type, value: facet.value})}
          addFilter={addFilter}
          removeFilter={removeFilter} />)}
      </div>
    )
  }
}

export default FacetsGroup
