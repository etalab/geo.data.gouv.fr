import React, { Component } from 'react'
import MediaQuery from 'react-responsive'
import { Line } from 'react-chartjs'
import Histogram from '../../Charts/Histogram/Histogram'
import HarvestsTable from '../../HarvestsTable/HarvestsTable'
import Chart from '../../Charts/Chart'

class HarvestsSection extends Component {
  constructor(props) {
    super(props)
    this.state = {harvests: undefined}
    this.getHarvests()
  }

  getHarvests() {
    if (!this.state.harvests) {
      return fetch(`https://inspire.data.gouv.fr/api/geogw/services/${this.props.catalog.id}/synchronizations`)
        .then((response) => response.json())
        .then((harvests) => {
          this.setState({harvests})
        })
        .catch((err) => {
          console.error(err)
        })
      }
  }

  getGraphData() {
    const reorderedHarvests = [...this.state.harvests].reverse()
    const data = []
    for (let harvest of reorderedHarvests) {
      if (harvest.status === "successful") {
        const date = new Date(harvest.finished).toLocaleDateString().split('-').reverse().join('/')
        data[date] = harvest.itemsFound
      }
    }
    return data
  }

  render() {
    if (this.state.harvests) {
      const dataGraph = this.getGraphData()
      const styles = {
        harvest: {
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
        },
        chart: {
          margin: '2em',
        },
      }
      return (
        <div style={styles.harvest}>
          <HarvestsTable harvests={this.state.harvests} catalog={this.props.catalog} />
          <div style={styles.chart}>
            <MediaQuery minWidth={701} >
              <Chart
                title={'Records Evolution'}
                description={'Evolution of the number of records per harvest'}
                chart={<Histogram chartType={Line} data={dataGraph} width="500" height="200" />} />
            </MediaQuery>

            <MediaQuery minWidth={501} maxWidth={700} >
              <Chart
                title={'Records Evolution'}
                description={'Evolution of the number of records per harvest'}
                chart={<Histogram chartType={Line} data={dataGraph} width="400" height="220" />} />
            </MediaQuery>

            <MediaQuery maxWidth={500} >
              <Chart
                title={'Records Evolution'}
                description={'Evolution of the number of records per harvest'}
                chart={<Histogram chartType={Line} data={dataGraph} width="260" height="180" />} />
            </MediaQuery>
          </div>
        </div>
    )} else {
      return <div></div>
    }
  }
}

export default HarvestsSection
