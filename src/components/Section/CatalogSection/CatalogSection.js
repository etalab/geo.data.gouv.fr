import React from 'react'
import HealthPreview from '../../Health/HealthPreview'
import { container } from './CatalogSection.css'

const CatalogSection = ({catalog}) => {
  return (
    <div className={container}>
      <div>
        <h1>{catalog.name}</h1>
        <a href={catalog.service.location}>Accès direct au service du catalogue</a>
      </div>
      <HealthPreview catalog={catalog}/>
    </div>
  )
}

export default CatalogSection
