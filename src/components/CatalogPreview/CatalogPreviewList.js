import React from 'react'

// Import Shared Components
import CatalogPreview from './CatalogPreview'
import ContentLoader from '../Loader/ContentLoader'

// Import Helpers
import { getCatalogOrderByScore } from '../../helpers/catalogs'

// Import CSS
import { loader } from './CatalogPreviewList.css'

const CatalogPreviewList = ({ catalogs, limit = 0 }) => {
  if (!catalogs) return <div className={loader}><ContentLoader /></div>

  let sortedCatalogs = getCatalogOrderByScore(catalogs)

  if (limit > 0) {
    sortedCatalogs = sortedCatalogs.slice(0, limit)
  }

  return (
      <span>{sortedCatalogs.map((catalog, idx) => <CatalogPreview key={idx} catalog={catalog} />)}</span>
  )
}

export default CatalogPreviewList
