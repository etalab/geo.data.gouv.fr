import React, { Component } from 'react'
import { colors } from '../../tools.js'

class Histogram extends Component {
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
    if (this.props.chartType) {
      if (this.props.chartType.displayName === 'LineChart' || this.props.chartType.displayName === 'BarChart') {
        return <this.props.chartType data={this.formatData(this.props.data)} width={this.props.width} height={this.props.height} />
      }
    } else {
      throw new Error('chartType props must be Bar or Line')
    }
  }
}

export default Histogram
