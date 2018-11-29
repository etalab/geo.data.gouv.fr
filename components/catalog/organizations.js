import React from 'react'
import PropTypes from 'prop-types'

import Facet from '../facet'

const Organizations = ({catalogName, organizationCounts}) => (
  <div>
    {Object.entries(organizationCounts).map(([value, count]) => (
      <span key={value}>
        <Facet defaultQuery={{
          catalog: catalogName
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

Organizations.propTypes = {
  catalogName: PropTypes.string.isRequired,
  organizationCounts: PropTypes.object.isRequired
}

export default Organizations
