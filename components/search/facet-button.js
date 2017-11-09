import React from 'react'

import FilterIcon from 'react-icons/lib/fa/filter'

const FacetButton = () => (
  <div>
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

export default FacetButton
