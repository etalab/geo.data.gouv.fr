import React, { Component } from 'react'
import MediaQuery from 'react-responsive'
import Paper from 'material-ui/Paper'
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
      chart: {
        display: '-wekit-inline-box',
        marginLeft: '-3em',
      },
    }
    return (
      <Paper zDepth={0}>

        <MediaQuery style={styles.chart} maxWidth={550} >
          <Bar data={data} width={260} height={180} />
        </MediaQuery>

        <MediaQuery style={styles.chart} minWidth={551}>
          <Bar data={data} width={420} height={260} />
        </MediaQuery>

      </Paper>
      )
  }
}

export default BarChart
