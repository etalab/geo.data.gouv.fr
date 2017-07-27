import React from 'react'
import { translate } from 'react-i18next'

import { Line } from 'react-chartjs-2'

import { colors } from '../../../tools.js'

export function formatData(data, t) {
  return {
    'labels': Object.keys(data).map( item => item),
    'datasets': [
      {
        label: t('label'),
        lineTension: 0.2,
        backgroundColor: colors[0],
        data: Object.keys(data).map( item => data[item])
      }
    ],
  }
}

export const Histogram = ({ data, width, height, t }) => {
  const formatedData = formatData(data, t)
  const options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
        }
      }]
    }
  }

  return <Line data={formatedData} width={width} height={height} options={options} />
}

export default translate('Histogram')(Histogram)
