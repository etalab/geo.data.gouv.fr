import React from 'react'
import PropTypes from 'prop-types'

import Facet from './Facet'

import { isActive, translateFilters } from '../../helpers/manageFilters'

import { container } from './FacetsGroup.scss'

const FacetsGroup = ({ type, facets, filters, addFilter }) => {
  const activeMap = facets.map(facet => isActive(filters, { name: type, value: facet.value }))

  if (activeMap.indexOf(false) === -1) {
    return null
  }

  return (
    <div className={container}>
      <h4>{translateFilters(type)}</h4>
      {facets.map((facet, idx) => <Facet
        key={idx}
        name={type}
        value={facet.value}
        count={facet.count}
        isActive={activeMap[idx]}
        addFilter={addFilter} />)}
    </div>
  )
}

FacetsGroup.propTypes = {
  type: PropTypes.string,
  facets: PropTypes.any,
  filters: PropTypes.any,
  addFilter: PropTypes.func
}

export default FacetsGroup
