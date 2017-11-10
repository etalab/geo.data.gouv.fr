import React from 'react'
import PropTypes from 'prop-types'

const Box = ({ children }) => (
  <div>
    {children}

    <style jsx>{`
      @import 'colors';

      div {
        border-left: 4px solid $blue;
        background-color: $white;
        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
        padding: 1.4em 2em;
        border-radius: 2px;
      }
    `}</style>
  </div>
)

Box.propTypes = {
  children: PropTypes.node
}

export default Box
