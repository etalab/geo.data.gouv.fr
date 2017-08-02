import React from 'react'
import PropTypes from 'prop-types'

import styles from './DoughnutChartList.scss'

const DoughnutChartList = ({ data }) => (
  <div className={styles.container}>
    {data.map((item, idx) => (
      <div key={idx} className={`ui small ${item.colorName} ${styles.label} label`}>
        {item.label}
      </div>
    ))}
  </div>
)

DoughnutChartList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    colorName: PropTypes.string
  }))
}

export default DoughnutChartList
