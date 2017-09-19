import React from 'react'
import PropTypes from 'prop-types'

import styles from './Button.scss'

const Button = ({ text, type, action, icon, className, style }) => (
  <button style={style} className={className || styles.button} onClick={action} type={type}>
    { icon && <i className={`${icon} icon`} />}{text}
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
  icon: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
}

Button.defaultProps = {
  type: 'button'
}

export default Button
