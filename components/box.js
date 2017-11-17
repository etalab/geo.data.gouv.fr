import React from 'react'
import PropTypes from 'prop-types'

const Box = ({ children }) => (
  <div>
    {children}

    <style jsx>{`
      @import 'colors';

      div {
        background-color: $white;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
        padding: 1.6em 2em;
        border-radius: 2px;

        @media (max-width: 551px) {
          padding: 0.6em 1em;
        }
      }
    `}</style>
  </div>
)

Box.propTypes = {
  children: PropTypes.node
}

export default Box
