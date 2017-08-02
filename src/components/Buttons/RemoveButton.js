import React from 'react'
import PropTypes from 'prop-types'

import Button from './Button'

import styles from './RemoveButton.scss'

const RemoveButton = ({ text, action, style }) => (
  <Button
    className={`${styles.remove} ${style}`}
    action={action}
    text={
      <span>
        <i className='trash icon' /> {text}
      </span>
    }
  />
)

RemoveButton.propTypes = {
  text: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  style: PropTypes.string
}

export default RemoveButton
