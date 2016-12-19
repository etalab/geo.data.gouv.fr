import React, { Component } from 'react'
import MediaQuery from 'react-responsive'
import Histogram from '../../Charts/Histogram/Histogram'
import HarvestsTable from '../../HarvestsTable/HarvestsTable'
import Chart from '../../Charts/Chart'
import { fetchHarvests } from '../../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../../helpers/components'
import { harvest, chart } from './HarvestsSection.css'

class HarvestsSection extends Component {
  constructor(props) {
    super(props)
    this.state = {errors: []}
  }

  componentWillMount() {
    return waitForDataAndSetState(fetchHarvests(this.props.catalog._id), this, 'harvests')
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  getGraphData() {
    const reorderedHarvests = [...this.state.harvests].reverse()
    const data = []
    for (let harvest of reorderedHarvests) {
      if (harvest.status === 'successful') {
        const date = new Date(harvest.finished).toLocaleDateString().split('-').reverse().join('/')
        data[date] = harvest.itemsFound
      }
    }
    return data
  }

  render() {
    if (this.state.harvests) {
      const dataGraph = this.getGraphData()

      return (
        <div className={harvest}>
          <HarvestsTable harvests={this.state.harvests} catalog={this.props.catalog} />
          <div className={chart}>
            <MediaQuery minWidth={701} >
              <Chart
                title={'Évolution des Enregistrements'}
                description={'Évolution du nombre d\'enregistrements par moissonnage'}
                chart={<Histogram data={dataGraph} width="500" height="200" />} />
            </MediaQuery>

            <MediaQuery minWidth={501} maxWidth={700} >
              <Chart
                title={'Évolution des Enregistrements'}
                description={'Évolution du nombre d\'enregistrements par moissonnage'}
                chart={<Histogram data={dataGraph} width="400" height="220" />} />
            </MediaQuery>

            <MediaQuery maxWidth={500} >
              <Chart
                title={'Évolution des Enregistrements'}
                description={'Évolution du nombre d\'enregistrements par moissonnage'}
                chart={<Histogram data={dataGraph} width="260" height="180" />} />
            </MediaQuery>
          </div>
        </div>
    )} else {
      return <div></div>
    }
  }
}

export default HarvestsSection
