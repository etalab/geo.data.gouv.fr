import React from 'react'
import Counter from '../../Statistics/Counter/Counter'

const CatalogSection = ({catalog}) => {
  return (
    <div className="ui equal width stackable grid">
      <div className="column">
        <h1 className="ui header">{catalog.name}</h1>
        <a href={catalog.serviceUrl}>Direct access to CSW feed</a>
      </div>
      <div className="column">
        <Counter value={catalog.lastHarvesting.recordsFound} size="small" label="Records" />
      </div>
    </div>
      )
}

export default CatalogSection
