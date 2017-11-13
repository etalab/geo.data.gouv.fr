import React from 'react'
import PropTypes from 'prop-types'

import Facet from '../facet'

const Oraganizations = ({ organizations }) => (
  <div>
    {Object.entries(organizations).map(([value, count]) => (
      <span key={value}>
        <Facet facet={{
          name: 'organization',
          value
        }} count={count} />
      </span>
    ))}

    <style jsx>{`
      div {
        margin-top: 10px;
      }

      span {
        display: inline-block;
        margin: 0 15px 10px 0;
      }
    `}</style>
  </div>
)

Oraganizations.propTypes = {
  organizations: PropTypes.object.isRequired
}

export default Oraganizations
