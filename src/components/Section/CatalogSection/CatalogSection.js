import React from 'react'
import Counter from '../../Statistics/Counter/Counter'

const CatalogSection = ({catalog, metrics}) => {
  return (
    <div className="ui equal width stackable grid">
      <div className="column">
        <h1 className="ui header">{catalog.name}</h1>
        <a href={catalog.serviceUrl}>Direct access to the catalog service</a>
      </div>
      <div className="column">
        <Counter value={metrics.totalCount} size="large" label="Records" />
      </div>
    </div>
      )
}

export default CatalogSection
