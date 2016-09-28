import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
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
      paper: {
        display: '-webkit-inline-box',
      },
      list: {
        mobile: {
          display: 'inherit'
        },
        computer: {
          display: 'block',
        }
      },
      label: {
        display: 'table',
        margin: 2,
      },
    }
    const list = data.map((item, idx) =>
        <div key={idx} style={styles.label} className={`ui small ${item.colorName} label`}>
          {item.label}
        </div>)

    return (
      <Paper zDepth={0}>

        <MediaQuery style={styles.paper} maxWidth={550} >
          <Pie data={data} width="160" />
          <div style={styles.list.mobile}>{list}</div>
        </MediaQuery>

        <MediaQuery style={styles.paper} minWidth={551}>
          <Pie data={data} width="200" />
          <div style={styles.list.computer}>{list}</div>
        </MediaQuery>

      </Paper>
      )
  }
}

export default PieChart
