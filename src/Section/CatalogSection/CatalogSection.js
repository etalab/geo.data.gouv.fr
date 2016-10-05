import React from 'react'
import Statistics from '../../Statistics/Statistics'

const CatalogSection = ({catalog}) => {
  return (
    <div className="ui equal width stackable grid">
      <div className="column">
        <h1 className="ui header">{catalog.name}</h1>
        <a href={catalog.serviceUrl}>Get the CSW stream</a>
      </div>
      <div className="column">
        <Statistics value={catalog.lastHarvesting.recordsFound} size="small" label="Records" />
      </div>
    </div>
      )
}

export default CatalogSection
