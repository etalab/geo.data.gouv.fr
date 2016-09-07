import React, { Component } from 'react'
import { Bar } from 'react-chartjs'
import { colors } from '../../tools.js'

class BarChart extends Component {
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
          fillColor: colors.map( color => color.value),
          data: Object.keys(data).map( item => data[item])
        }
      ],
    }
  }

  render() {
    const data = this.getData()

    return (
      <div className="ui grid container">

        <div className="two column row">
          <div className="column">
            <Bar data={data} />
          </div>
        </div>
      </div>
      )
  }
}

export default BarChart
