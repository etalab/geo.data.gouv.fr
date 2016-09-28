import React from 'react'
import Paper from 'material-ui/Paper'
import MediaQuery from 'react-responsive'
import { Line } from 'react-chartjs'
import { colors } from '../../tools.js'

const LineChart = ({data}) => {

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
      <MediaQuery minWidth={701} >
        <Line data={result} width="600" height="200" />
      </MediaQuery>

      <MediaQuery minWidth={501} maxWidth={700} >
        <Line data={result} width="400" height="220" />
      </MediaQuery>

      <MediaQuery maxWidth={500} >
        <Line data={result} width="260" height="180" />
      </MediaQuery>

    </Paper>
    )
}

export default LineChart
