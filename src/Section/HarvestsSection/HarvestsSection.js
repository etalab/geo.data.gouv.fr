import React, { Component } from 'react'
import Harvest from './Harvest/Harvest'
import HarvestDetail from './HarvestDetail/HarvestDetail'
import Accordion from '../../Accordion/Accordion'

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

  render() {
    if (this.state.harvests) {
      return (
      <div className="ui styled accordion">
        {this.state.harvests.map((harvest , idx) =>
            <Accordion
              key={idx}
              title={<Harvest harvest={harvest} />}
              content={<HarvestDetail logs={harvest.log} />} />
        )}
      </div>
    )} else {
      return <div></div>
    }
  }
}

export default HarvestsSection
