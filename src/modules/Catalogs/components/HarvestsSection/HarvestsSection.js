import React, { Component } from 'react'

import HarvestsTable from '../../components/HarvestsTable/HarvestsTable'

import Histogram from '../../../../components/Charts/Histogram/Histogram'
import Chart from '../../../../components/Charts/Chart'

import { fetchHarvests, syncCatalog } from '../../../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../../../helpers/components'

import { harvest, chart, pending } from './HarvestsSection.css'

class HarvestsSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isPending: this.props.catalog.service.sync.pending,
      errors: []
    }
  }

  componentWillMount() {
    return waitForDataAndSetState(fetchHarvests(this.props.catalog._id), this, 'harvests')
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  sync() {
    this.setState({isPending: true})
    syncCatalog(this.props.catalog._id)
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

    const { isPending } = { isPending: true }
    const { catalog } = this.props

    const dataGraph = this.getGraphData()
    const histogram = <Histogram className={chart} data={dataGraph} width="400" height="220" />

    return (
      <div className={harvest}>
        <HarvestsTable harvests={harvests} catalog={catalog} pending={isPending} />
        <div className={chart}>
          <Chart
            title={'Évolution des Enregistrements'}
            description={'Évolution du nombre d\'enregistrements par moissonnage'}
            chart={histogram} />
        </div>
        {isPending ? <div className={pending}>Synchronisation en cours ...</div> : <button onClick={() => this.sync()}>Synchroniser</button>}
      </div>
    )
  }
}

export default HarvestsSection
