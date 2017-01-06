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
    const formatedData = formatData(data)

    return <Line data={formatedData} width={width} height={height} />
  }
}

export default Histogram
