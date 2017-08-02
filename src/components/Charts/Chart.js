import React from 'react'
import PropTypes from 'prop-types'

import styles from './Chart.scss'

const Chart = ({ chart, description }) => (
  <div className={styles.container}>
    <h3>{description}</h3>
    {chart}
  </div>
)

Chart.propTypes = {
  chart: PropTypes.node.isRequired,
  description: PropTypes.string.isRequired
}

export default Chart
