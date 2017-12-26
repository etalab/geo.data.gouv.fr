import React from 'react'
import PropTypes from 'prop-types'

import SuccessIcon from 'react-icons/lib/fa/check-circle'

const Success = ({children}) => (
  <div className='container'>
    <span className='icon'>
      <SuccessIcon />
    </span>
    <div>{children}</div>

    <style jsx>{`
      @import 'colors';

      .container {
        background-color: lighten($green, 51%);
        padding: 0.8em;
        border-radius: 2px;
        display: flex;
        align-items: center;

        :global(a) {
          color: $green;

          &:hover {
            text-decoration: underline;
          }
        }
      }

      .icon {
        color: lighten($green, 12%);
        font-size: 1.8em;
        margin-right: 0.9rem;
      }
    `}</style>
  </div>
)

Success.propTypes = {
  children: PropTypes.node.isRequired
}

export default Success
