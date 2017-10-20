import React from 'react'
import PropTypes from 'prop-types'

import styles from './Container.scss'

const Container = ({ children, fluid }) => (
  <div className={styles.container} style={{
    maxWidth: fluid ? null : 1200
  }}>
    {children}
  </div>
)

Container.propTypes = {
  children: PropTypes.node,
  fluid: PropTypes.bool
}

Container.defaultProps = {
  fluid: false
}

export default Container
