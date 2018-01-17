import PropTypes from 'prop-types'

const Button = ({children, type, size, color, href, disabled, block, ...props}) => {
  const buttonProps = href ? {} : props

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${size} ${disabled ? '' : color} ${block ? 'block' : ''}`}
      tabIndex={href ? -1 : null}
      {...buttonProps}
    >
      {href ? (
        <a href={href} {...props}>{children}</a>
      ) : children}

      <style jsx>{`
        @import 'colors';

        button {
          display: inline-block;
          border: 0 none;
          border-radius: 2px;
          padding: 5px 7px;
          border: 1px solid transparent;
          cursor: pointer;
          -webkit-font-smoothing: antialiased;

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

          &:hover {
            color: inherit;
          }
        }

        .block {
          display: block;
          width: 100%;
        }

        .large {
          font-size: 1.2em;
          padding: 12px 16px;

          a {
            margin: -13px -17px;
            padding: 13px 17px;
          }
        }

        // Colors
        .blue {
          background-color: $blue;
          border-color: $blue;
          color: $white;

          &:hover {
            background-color: darken($blue, 10%);
            border-color: darken($blue, 10%);
          }
        }

        .red {
          background-color: $red;
          border-color: $red;
          color: $white;

          &:hover {
            background-color: darken($red, 10%);
            border-color: darken($red, 10%);
          }
        }

        .white {
          background-color: $white;
          border-color: $blue;
          color: $blue;

          &:hover {
            background-color: lighten($blue, 43%);
          }
        }
      `}</style>
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  type: PropTypes.string,
  href: PropTypes.string,
  size: PropTypes.oneOf([
    '',
    'large'
  ]),
  color: PropTypes.oneOf([
    'blue',
    'red',
    'white'
  ])
}

Button.defaultProps = {
  disabled: false,
  block: false,
  href: null,
  size: '',
  type: 'button',
  color: 'blue'
}

export default Button
