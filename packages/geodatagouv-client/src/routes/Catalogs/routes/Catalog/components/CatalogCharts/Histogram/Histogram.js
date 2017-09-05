import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import Chart from 'common/components/Chart'

import withContainer from '../withContainer'

import colors from '../colors'

export function formatData(data, t) {
  return {
    'labels': Object.keys(data).map(item => item),
    'datasets': [
      {
        label: t('components.Histogram.label'),
        lineTension: 0.2,
        backgroundColor: colors[0],
        data: Object.keys(data).map(item => data[item])
      }
    ]
  }
}

export const Histogram = ({ data, width, height, t }) => {
  const formatedData = formatData(data, t)
  const options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }

  return (
    <Chart
      chartType='Line'
      data={formatedData}
      width={width}
      height={height}
      options={options}
    />
  )
}

Histogram.propTypes = {
  data: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  t: PropTypes.func.isRequired
}

export default withContainer(translate('Common')(Histogram))
