import React from 'react'
import PropTypes from 'prop-types'
import { forEach, sortBy } from 'lodash'

import FacetsGroup from './FacetsGroup'

class Facets extends React.PureComponent {
  render() {
    const { facets, filters, addFilter } = this.props
    if (!facets) return <div />

    const facetsArray = []
    forEach(facets, (value, key) => {
      const facet = { type: key, value }
      facetsArray.push(facet)
    })

    // TODO Sort by most useful facets
    const sorted = sortBy(facetsArray, 'type')

    return (
      <div>
        { sorted.map(facet => <FacetsGroup
          key={facet.type}
          type={facet.type}
          facets={facet.value}
          filters={filters}
          addFilter={addFilter} />) }
      </div>
    )
  }
}

Facets.propTypes = {
  facets: PropTypes.object,
  filters: PropTypes.any,
  addFilter: PropTypes.func
}

export default Facets
