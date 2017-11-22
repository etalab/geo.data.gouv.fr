import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ children, type, size, href, ...props }) => {
  const buttonProps = href ? {} : props

  return (
    <button type={type} className={size} {...buttonProps}>
      {href ? (
        <a href={href} {...props}>{children}</a>
      ) : children}

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
            background-color: darken($blue, 10%);
          }

          &:disabled {
            background-color: $lightgrey;
            color: $grey;
            cursor: not-allowed;
          }
        }

        a {
          display: block;
          margin: -6px -8px;
          padding: 6px 8px;
          color: inherit;
        }

        .large {
          font-size: 1.2em;
          padding: 12px 16px;

          a {
            display: block;
            margin: -12px -16px;
            padding: 12px 16px;
          }
        }
      `}</style>
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  href: PropTypes.string,
  size: PropTypes.oneOf([
    'large'
  ])
}

Button.defaultProps = {
  type: 'button',
  href: null
}

export default Button
