import React, { Component } from 'react'
import { Line } from 'react-chartjs'
import { colors } from '../../tools.js'

class LineChart extends Component {
  constructor(props) {
    super(props)
    this.getData = this.getData.bind(this)
  }

  getData() {
    const data = this.props.data

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
    const data = this.getData()

    return (
      <div className="ui grid container">
        <div className="column">
          <Line data={data} width="400" height="200" />
        </div>
      </div>
      )
  }
}

export default LineChart
