import React from 'react'
import PropTypes from 'prop-types'

import styles from './Button.scss'

const Button = ({ text, type, action, className }) => (
  <button className={className || styles.button} onClick={action} type={type}>
    {text}
  </button>
)

Button.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]).isRequired,
  type: PropTypes.oneOf([
    'button',
    'submit',
    'reset'
  ]),
  action: PropTypes.func,
  className: PropTypes.string
}

Button.defaultProps = {
  type: 'button'
}

export default Button
