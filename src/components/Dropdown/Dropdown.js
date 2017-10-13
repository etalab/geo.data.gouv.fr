import React from 'react'
import PropTypes from 'prop-types'

import styles from './Dropdown.scss'

const Dropdown = ({ title, children }) => (
  <div className={styles.dropdown}>
    {title}
    <div className={styles.dropdownContent}>
      {children}
    </div>
  </div>
)

Dropdown.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node
}

export default Dropdown
