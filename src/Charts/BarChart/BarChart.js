import React, { Component } from 'react'
import { Bar } from 'react-chartjs'
import { colors } from '../../tools.js'

class BarChart extends Component {
  getData() {
    const data = this.props.data

    return {
      'labels': Object.keys(data).map( item => item),
      'datasets': [
        {
          fillColor: colors.map( color => color.value),
          data: Object.keys(data).map( item => data[item])
        }
      ],
    }
  }

  render() {
    const data = this.getData()
    return <Bar data={data} width={this.props.width} height={this.props.height} />
  }
}

export default BarChart
