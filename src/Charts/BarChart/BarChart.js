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
    const styles = {
      container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
    }
    return (
      <div style={styles.container}>
        <h2>{this.props.title}</h2>
        <Bar data={data} width={this.props.width} height={this.props.height} />
        <h4>{this.props.description}</h4>
      </div>
    )
  }
}

export default BarChart
