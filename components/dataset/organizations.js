import React from 'react'
import PropTypes from 'prop-types'

import Facet from '../facet'

const Oraganizations = ({ organizations }) => (
  <div>
    {organizations.map(organization => (
      <span >
        <Facet key={organization} facet={{
          name: 'organization',
          value: organization
        }} />
      </span>
    ))}

    <style jsx>{`
      span {
        display: block;
        max-width: 100%;
        margin: 0 0 6px 0;

        &:last-child {
          margin: 0;
        }
      }
    `}</style>
  </div>
)

Oraganizations.propTypes = {
  organizations: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Oraganizations
