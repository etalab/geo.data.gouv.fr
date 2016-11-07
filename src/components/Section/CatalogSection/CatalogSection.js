import React from 'react'

const CatalogSection = ({catalog}) => {
  return (
    <div>
      <h1 className="ui header">{catalog.name}</h1>
      <a href={catalog.serviceUrl}>Direct access to the catalog service</a>
    </div>
  )
}

export default CatalogSection
