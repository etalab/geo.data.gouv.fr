import React from 'react'
import { container } from './CatalogSection.css'

const CatalogSection = ({catalog}) => {
  return (
    <div className={container}>
      <h1>{catalog.name}</h1>
      <a href={catalog.service.location}>Accès direct au service du catalogue</a>
    </div>
  )
}

export default CatalogSection
