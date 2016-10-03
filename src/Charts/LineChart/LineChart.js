import React from 'react'
import Paper from 'material-ui/Paper'
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

  return (
    <Paper zDepth={0}>
      <Line data={result} width={width} height={height} />
    </Paper>
    )
}

export default LineChart
