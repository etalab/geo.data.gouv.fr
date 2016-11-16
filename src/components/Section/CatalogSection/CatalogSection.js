import React from 'react'
import { theme } from '../../../tools'

const style = {
  marginBottom: '2em',
  padding: '2em',
  backgroundColor: theme.blue,
}

const colorWhite = {
  color: 'white'
}

const CatalogSection = ({catalog}) => {
  return (
    <div style={style}>
      <h1 className="ui header" style={colorWhite}>{catalog.name}</h1>
      <a style={colorWhite} href={catalog.serviceUrl}>Direct access to the catalog service</a>
    </div>
  )
}

export default CatalogSection
