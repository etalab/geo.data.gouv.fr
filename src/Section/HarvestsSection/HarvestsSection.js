import React, { Component } from 'react'
import Harvest from './Harvest/Harvest'
import HarvestDetail from './HarvestDetail/HarvestDetail'
import Accordion from '../../Accordion/Accordion'
import LineChart from '../../Charts/LineChart/LineChart'

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
    let data = {}
    for (var i = this.state.harvests.length - 1; i >= 0; i--) {
      const harvest = this.state.harvests[i]
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
      <div className="ui stackable grid">

        <div className="eight wide column">
          <div className="ui styled accordion">
            {this.state.harvests.map((harvest , idx) =>
                <Accordion
                  key={idx}
                  title={<Harvest harvest={harvest} />}
                  content={<HarvestDetail logs={harvest.log} />} />
            )}
          </div>
        </div>

        <div className="eight wide column">
          <LineChart data={dataGraph} />
        </div>

      </div>
    )} else {
      return <div></div>
    }
  }
}

export default HarvestsSection
