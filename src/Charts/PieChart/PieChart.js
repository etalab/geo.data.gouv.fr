import React, { Component } from 'react'
import { Pie } from 'react-chartjs'
import { colors } from '../../tools.js'
import MediaQuery from 'react-responsive'

class PieChart extends Component {
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

    return (
      <div style={styles.chart}>

        <MediaQuery minWidth={551}>
          <Pie data={data} width="200" />
        </MediaQuery>
        <MediaQuery style={styles.list.column} minWidth={551}>{list}</MediaQuery>

        <MediaQuery maxWidth={550} >
          <Pie data={data} width="160" />
        </MediaQuery>

        <MediaQuery style={styles.list.row} maxWidth={550}>{list}</MediaQuery>

      </div>
      )
  }
}

export default PieChart
