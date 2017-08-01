import React from 'react'
import PropTypes from 'prop-types'

import CheckItem from './CheckItem'

import styles from './Check.scss'

const Check = ({ title, isValid, msg, children }) => (
  <div className={styles.check}>
    <h3>
      <CheckItem name={title} valid={isValid} />
    </h3>
    <div className={styles.content}>
      {msg && (
        <div>{msg}</div>
      )}
      {children}
    </div>
  </div>
)

Check.propTypes = {
  title: PropTypes.string.isRequired,
  isValid: PropTypes.bool.isRequired,
  msg: PropTypes.string,
  children: PropTypes.node
}

export default Check
