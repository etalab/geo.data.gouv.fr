import React from 'react'
import PropTypes from 'prop-types'

import Facet from '../facet'

const ActiveFacets = ({ facets }) => (
  <div>
    {facets.map(facet => (
      <span key={`${facet.name}-${facet.value}`}>
        <Facet facet={facet} detailed remove />
      </span>
    ))}

    <style jsx>{`
      div {
        margin-top: 10px;
      }

      span {
        display: inline-block;
        margin: 0 5px 5px 0;
      }
    `}</style>
  </div>
)

ActiveFacets.propTypes = {
  facets: PropTypes.array.isRequired
}

export default ActiveFacets
