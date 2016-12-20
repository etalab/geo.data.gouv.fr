import React, { Component } from 'react'
import { Doughnut } from 'react-chartjs'
import { colors } from '../../../tools.js'
import DoughnutChartList from './DoughnutChartList/DoughnutChartList'
import Percent from '../../Statistics/Percent/Percent'
import { container } from './DoughnutChart.css'

class DoughnutChart extends Component {
  formatData(data) {
    return Object.keys(data)
      .sort((a, b) => {
        return data[a] < data[b]
      })
      .map( (val, idx) => {
        const color = this.setColor(idx)

        return {
          'label': val,
          'value': data[val],
          'color':  color.value,
          'colorName': color.name
        }
      })
  }

  setColor(idx) {
    return colors[idx] ? colors[idx] : {name: 'grey', value: '#767676'}
  }

  render() {
    const data = this.formatData(this.props.data)

    if (data.length === 0) {
      return <h1>Aucune donnée</h1>
    }

    if (data.length === 1) {
      return <Percent value={100} total={100} label={data[0].label} icon="database icon" size="large" />
    }

    return (
      <div className={container}>
        <Doughnut className="doughnut computer" data={data} width="260" />
        <DoughnutChartList data={data}/>
      </div>
    )
  }
}

export default DoughnutChart
