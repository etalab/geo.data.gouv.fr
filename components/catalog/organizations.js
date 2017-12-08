import React from 'react'
import PropTypes from 'prop-types'

import Facet from '../facet'

const Oraganizations = ({ catalog: { name, metrics: { records: { counts } } } }) => (
  <div>
    {Object.entries(counts.organizations).map(([value, count]) => (
      <span key={value}>
        <Facet defaultQuery={{
          catalog: name
        }} facet={{
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
        max-width: 100%;

        @media (max-width: 551px) {
          display: block;
          margin-right: 0;
        }
      }
    `}</style>
  </div>
)

Oraganizations.propTypes = {
  catalog: PropTypes.shape({
    name: PropTypes.string.isRequired,
    metrics: PropTypes.shape({
      records: PropTypes.shape({
        counts: PropTypes.shape({
          organizations: PropTypes.object.isRequired
        }).isRequired
      }).isRequired
    }).isRequired
  }).isRequired
}

export default Oraganizations
