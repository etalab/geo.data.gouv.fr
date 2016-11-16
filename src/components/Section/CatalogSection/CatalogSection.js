import React from 'react'

const style = {
  marginBottom: '2em',
}

const CatalogSection = ({catalog}) => {
  return (
    <div style={style}>
      <h1 className="ui header">{catalog.name}</h1>
      <a href={catalog.serviceUrl}>Direct access to the catalog service</a>
    </div>
  )
}

export default CatalogSection
