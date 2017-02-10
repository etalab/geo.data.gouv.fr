import React from 'react'

import { Line } from 'react-chartjs-2'

import { colors } from '../../../tools.js'

export function formatData(data) {
  return {
    'labels': Object.keys(data).map( item => item),
    'datasets': [
      {
        label: 'Enregistrements',
        lineTension: 0.2,
        backgroundColor: colors[0],
        data: Object.keys(data).map( item => data[item])
      }
    ],
  }
}

const Histogram = ({ data, width, height }) => {
  const formatedData = formatData(data)

  return <Line data={formatedData} width={width} height={height} />
}

export default Histogram
