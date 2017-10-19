import React from 'react'
import PropTypes from 'prop-types'

import styles from './Container.scss'

const Container = ({ children, style }) => (
  <div className={styles.container} style={style}>
    {children}
  </div>
)

Container.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
}

export default Container
