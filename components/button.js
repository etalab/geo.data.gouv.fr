import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ children, type, name, onClick, disabled, size }) => (
  <button type={type} name={name} onClick={onClick} disabled={disabled} className={size}>
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

      .large {
        font-size: 1.2em;
        padding: 12px 16px;
      }
    `}</style>
  </button>
)

Button.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf([
    'large'
  ])
}

Button.defaultProps = {
  type: 'button',
  disabled: false
}

export default Button
