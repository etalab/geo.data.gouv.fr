import React from 'react'
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
    <div className="ui grid container">
      <div className="column">
        <Line data={result} width="400" height="200" />
      </div>
    </div>
    )
}

export default LineChart
