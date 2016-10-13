import React, { Component } from 'react'
import { Doughnut } from 'react-chartjs'
import { colors } from '../../tools.js'
import DoughnutChartList from './DoughnutChartList/DoughnutChartList'
import Percent from '../../Statistics/Percent/Percent'
import MediaQuery from 'react-responsive'

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
    const styles = {
      chart: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      },
    }

    if (data.length === 1) {
      return <Percent value={100} total={100} label={data[0].label} icon="database icon" size="small" description={this.props.description} />
    } else if (data.length === 0) {
      return <h1>No data</h1>
    } else {
      return (
        <div>

          <div style={styles.chart}>
            <MediaQuery minWidth={551}>
              <Doughnut data={data} width="200" />
            </MediaQuery>

            <MediaQuery maxWidth={550} >
              <Doughnut data={data} width="160" />
            </MediaQuery>

            <DoughnutChartList data={data}/>
          </div>

        </div>
        )
    }
  }
}

export default DoughnutChart
