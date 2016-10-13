import React, { Component } from 'react'
import { Line } from 'react-chartjs'
import { colors } from '../../tools.js'

class LineChart extends Component {
  formatData(data) {
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

  render() {
    return <Line data={this.formatData(this.props.data)} width={this.props.width} height={this.props.height} />
  }
}

export default LineChart
