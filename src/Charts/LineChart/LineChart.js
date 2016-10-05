import React from 'react'
import { Line } from 'react-chartjs'
import { colors } from '../../tools.js'

const LineChart = ({data, width, height}) => {

  const result = {
    'labels': Object.keys(data).map( item => item),
    'datasets': [
      {
        fillColor: colors[0].value,
        data: Object.keys(data).map( item => data[item])
      }
    ],
  }

  return <Line data={result} width={width} height={height} />
}

export default LineChart
