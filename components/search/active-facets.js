import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import Facet from '../facet'

const ActiveFacets = ({ facets, t }) => (
  <div>
    {facets.map(facet => (
      <span className='facet' key={`${facet.name}-${facet.value}`}>
        <Facet facet={facet} detailed removable />
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
  facets: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired
}

export default translate('search')(ActiveFacets)
