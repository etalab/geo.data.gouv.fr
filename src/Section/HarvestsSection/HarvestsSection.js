import React, { Component } from 'react'
import LineChart from '../../Charts/LineChart/LineChart'
import HarvestsTable from '../../HarvestsTable/HarvestsTable'

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
      return (
        <div className="ui center aligned stackable grid">

          <div className="sixteen wide column">
            <HarvestsTable harvests={this.state.harvests} catalog={this.props.catalog} />
          </div>

          <div className="sixteen wide column">
            <LineChart data={dataGraph} />
          </div>
        </div>
    )} else {
      return <div></div>
    }
  }
}

export default HarvestsSection
