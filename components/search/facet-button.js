import React from 'react'
import PropTypes from 'prop-types'

import FilterIcon from 'react-icons/lib/fa/filter'

const FacetButton = ({ onClick }) => (
  <div onClick={onClick}>
    <FilterIcon />

    <style jsx>{`
      @import 'colors';

      div {
        background-color: $blue;
        color: $white;
        margin-left: 10px;
        font-size: 2em;
        border-radius: 2px;
        display: none;

        @media (max-width: 960px) {
          line-height: 58px;
          padding: 0 12px;
          display: block;
        }

        @media (max-width: 768px) {
          line-height: 50px;
          padding: 0 10px;
        }
      }
    `}</style>
  </div>
)

FacetButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default FacetButton
