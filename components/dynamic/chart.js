import React from 'react'
import PropTypes from 'prop-types'

import * as Charts from 'react-chartjs-2'

const Chart = ({ chartType, ...otherProps }) => {
  const Component = Charts[chartType]

  return (
    <Component {...otherProps} />
  )
}

Chart.propTypes = {
  chartType: PropTypes.oneOf([
    'Bar',
    'Bubble',
    'Chart',
    'Doughnut',
    'HorizontalBar',
    'Line',
    'Pie',
    'Polar',
    'Radar',
    'Scatter'
  ]).isRequired
}

export default Chart
