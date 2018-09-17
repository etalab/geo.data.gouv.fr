import React from 'react'
import PropTypes from 'prop-types'
import css from 'styled-jsx/css'

const style = css`
  @import 'colors';

  .wrapper {
    display: inline-block;
    border: 0 none;
    border-radius: 2px;
    padding: 5px 7px;
    border: 1px solid transparent;
    cursor: pointer;
    -webkit-font-smoothing: antialiased;
    color: inherit;

    &:disabled {
      background-color: $lightgrey;
      color: $grey;
      cursor: not-allowed;
    }
  }

  .block {
    display: block;
    width: 100%;
  }

  .small {
    font-size: 0.8em;
    padding: 2px 4px;
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
`

const Button = ({children, type, size, color, href, disabled, block, ...props}) => {
  if (href) {
    return (
      <a
        href={href}
        className={`wrapper ${size} ${disabled ? '' : color} ${block ? 'block' : ''}`}
        {...props}
      >
        {children}
        <style jsx>{style}</style>
      </a>
    )
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={`wrapper ${size} ${disabled ? '' : color} ${block ? 'block' : ''}`}
      {...props}
    >
      {children}
      <style jsx>{style}</style>
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
    'small',
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
