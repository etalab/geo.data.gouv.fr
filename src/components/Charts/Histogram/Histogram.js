import React, { Component } from 'react'
import { colors } from '../../../tools.js'

function formatData(data) {
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
    const { chartType, data, width, height } = this.props
    if (chartType) {
      if (chartType.displayName === 'LineChart' || chartType.displayName === 'BarChart') {
        return <chartType data={formatData(data)} width={width} height={height} />
      }
    } else {
      throw new Error('chartType props must be Bar or Line')
    }
  }
}

export default Histogram
