import React from 'react'
import { Link } from 'react-router'
import CatalogPreview from './CatalogPreview/CatalogPreview'
import LastHarvestStatus from '../LastHarvestStatus/LastHarvestStatus'
import { link, paper, title } from './Catalog.css'

const Catalog = ({ catalog }) => {
  return (
      <Link to={`/catalogs/${catalog._id}`} className={link}>
        <div className={paper}>
          <div className={title}>{catalog.name}</div>
          <LastHarvestStatus harvest={catalog.service.sync}/>
          <CatalogPreview metrics={catalog.metrics} />
        </div>
      </Link>
  )
}

export default Catalog
