import React, { Component } from 'react'
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
    const { harvests } = this.state

    if (!harvests ) return null

    const dataGraph = this.getGraphData()
    const histogram = <Histogram className={chart} data={dataGraph} width="400" height="220" />

    return (
      <div className={harvest}>
        <HarvestsTable harvests={harvests} catalog={this.props.catalog} />
        <div className={chart}>
          <Chart
            title={'Évolution des Enregistrements'}
            description={'Évolution du nombre d\'enregistrements par moissonnage'}
            chart={histogram} />
        </div>
      </div>
    )
  }
}

export default HarvestsSection
