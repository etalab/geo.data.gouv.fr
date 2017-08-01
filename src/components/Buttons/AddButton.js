import React from 'react'
import PropTypes from 'prop-types'

import Button from './Button'

import styles from './AddButton.scss'

const AddButton = ({ text, action, style }) => (
  <Button
    className={`${styles.add} ${style}`}
    action={action}
    text={
      <span>
        <i className='plus icon' /> {text}
      </span>
    }
  />
)

AddButton.propTypes = {
  text: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  style: PropTypes.string
}

export default AddButton
