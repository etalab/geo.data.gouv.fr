import React from 'react'
import PropTypes from 'prop-types'

import styles from './Button.scss'

const Button = ({ text, type, action }) => (
  <button className={styles.button} onClick={action} type={type}>
    {text}
  </button>
)

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'button',
    'submit',
    'reset'
  ]),
  action: PropTypes.func.isRequired,
}

Button.defaultProps = {
  type: 'button'
}

export default Button
