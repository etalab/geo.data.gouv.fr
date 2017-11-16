import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ children, type, onClick, disabled }) => (
  <button type={type} onClick={onClick} disabled={disabled}>
    {children}

    <style jsx>{`
      @import 'colors';

      button {
        display: block;
        width: 100%;
        background-color: $blue;
        border: 0 none;
        color: $white;
        border-radius: 2px;
        padding: 6px 8px;
        cursor: pointer;

        &:hover {
          background-color: $highlight-blue;
        }

        &:disabled {
          background-color: $lightgrey;
          color: $grey;
          cursor: not-allowed;
        }
      }
    `}</style>
  </button>
)

Button.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

Button.defaultProps = {
  type: 'button',
  disabled: false
}

export default Button
