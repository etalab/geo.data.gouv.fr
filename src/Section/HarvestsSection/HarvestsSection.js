import React from 'react'
import Harvest from './Harvest/Harvest'
import HarvestDetail from './HarvestDetail/HarvestDetail'
import Accordion from '../../Accordion/Accordion'

const HarvestsSection = () => {
    let harvests = []

    harvests.push(this.props.catalog.lastHarvesting)
    harvests.push(this.props.catalog.lastHarvesting)
    harvests.push(this.props.catalog.lastHarvesting)
    harvests.push(this.props.catalog.lastHarvesting)

    return (
      <div className="ui styled accordion">
        {harvests.map((harvest , idx) =>
            <Accordion
              key={idx}
              title={<Harvest harvest={harvest} />}
              content={<HarvestDetail harvest={harvest} />} />
        )}
      </div>
    )
}

export default HarvestsSection
