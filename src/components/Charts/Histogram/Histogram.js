import React, { Component } from 'react'
import { Line } from 'react-chartjs'
import { colors } from '../../../tools.js'

export function formatData(data) {
  return {
    'labels': Object.keys(data).map( item => item),
    'datasets': [
      {
        fillColor: colors[0].value,
        data: Object.keys(data).map( item => data[item])
      }
    ],
  }
}

class Histogram extends Component {
  render() {
    const { data, width, height } = this.props

    return <Line data={formatData(data)} width={width} height={height} />
  }
}

export default Histogram
