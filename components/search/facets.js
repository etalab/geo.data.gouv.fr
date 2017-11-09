import React from 'react'
import PropTypes from 'prop-types'

import FacetGroup from './facet-group'

const Facets = ({ groups }) => {
  if (!groups.length) {
    return null
  }

  return (
    <div>
      {groups.map(({ name, values }) => (
        <FacetGroup
          key={name}
          name={name}
          values={values}
        />
      ))}

      <style jsx>{`
        div {
          margin-left: 2em;
          flex-basis: 272px;
          flex-shrink: 0;

          @media (max-width: 960px) {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

Facets.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    values: PropTypes.array.isRequired
  })).isRequired
}

export default Facets
