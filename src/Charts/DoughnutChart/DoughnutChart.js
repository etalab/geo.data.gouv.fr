import React, { Component } from 'react'
import { Doughnut } from 'react-chartjs'
import { colors } from '../../tools.js'
import Percent from '../../Statistics/Percent/Percent'
import MediaQuery from 'react-responsive'

class DoughnutChart extends Component {
  getData() {
    const data = this.props.data

    return Object.keys(data).map( (val, idx) => {
      const color = this.setColor(idx)

      return {
        'label': val,
        'value': data[val],
        'color':  color.value,
        'colorName': color.name
      } })
      .sort((a, b) => {
        return a.value < b.value
      })
  }

  setColor(idx) {
    return colors[idx] ? colors[idx] : {name: 'grey', value: '#767676'}
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
      chart: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      },
      list: {
        row: {
          display: 'flex',
        },
        column: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }
      },
      label: {
        margin: '0.2em',
      },
    }
    const list = data.map((item, idx) =>
        <div key={idx} style={styles.label} className={`ui small ${item.colorName} label`}>
          {item.label}
        </div>)

    if (data.length === 1) {
      return <Percent value={100} total={100} label={data[0].label} icon="database icon" size="small" description={this.props.description} />
    } else if (data.length === 0) {
      return <h1>No data</h1>
    } else {
      return (
        <div style={styles.container}>

          <h2>{this.props.title}</h2>

          <div style={styles.chart}>
            <MediaQuery minWidth={551}>
              <Doughnut data={data} width="200" />
            </MediaQuery>
            <MediaQuery style={styles.list.column} minWidth={551}>{list}</MediaQuery>

            <MediaQuery maxWidth={550} >
              <Doughnut data={data} width="160" />
            </MediaQuery>

            <MediaQuery style={styles.list.row} maxWidth={550}>{list}</MediaQuery>
          </div>

          <h4>{this.props.description}</h4>

        </div>
        )
    }
  }
}

export default DoughnutChart
