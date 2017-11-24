import React from 'react'
import PropTypes from 'prop-types'

import WarningIcon from 'react-icons/lib/fa/exclamation-triangle'

const Warning = ({ children }) => (
  <div>
    <span className='icon'>
      <WarningIcon />
    </span>
    {children}

    <style jsx>{`
      @import 'colors';

      div {
        background-color: lighten($yellow, 45%);
        padding: 0.8em;
        border-radius: 3px;
        display: flex;
        align-items: center;
      }

      .icon {
        color: lighten($yellow, 20%);
        font-size: 2em;
        margin-right: 1rem;
      }
    `}</style>
  </div>
)

Warning.propTypes = {
  children: PropTypes.node
}

export default Warning
