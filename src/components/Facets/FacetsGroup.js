import React, { Component } from 'react'
import Facet from './Facet'
import { isActive } from '../../helpers/manageFilters'

const styles = {
  type: {
    textTransform: 'capitalize',
    fontSize: '1em',
    fontWeight: 400,
    marginBottom: '1em',
  },
  group: {
    marginBottom: '1em',
  }
}

class FacetsGroup extends Component {
  render() {
    const { type, facets, filters, addFilter, removeFilter } = this.props

    return (
      <div style={styles.group}>
        <h4 style={styles.type}>{type}</h4>
        {facets.map((facet, idx) => <Facet
          key={idx}
          name={type}
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
