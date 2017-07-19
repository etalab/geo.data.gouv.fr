import React from 'react'
import PropTypes from 'prop-types'

import CatalogFacets from '../CatalogFacets'

const CatalogFacetsList = ({ catalog, metrics, search }) => {
  const { organizations, keywords } = metrics.records.counts

  const onOrganizationSearch = facet => search({
    organization: facet.value,
    catalog: catalog.name
  })

  const onKeywordSearch = facet => search({
    keyword: facet.value,
    catalog: catalog.name
  })

  return (
    <div>
      <CatalogFacets
        title='Organisations'
        filters={organizations}
        search={onOrganizationSearch}
      />
      <CatalogFacets
        title='Mots-clés'
        filters={keywords}
        search={onKeywordSearch}
      />
    </div>
  )
}

CatalogFacetsList.propTypes = {
  catalog: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,

  metrics: PropTypes.shape({
    records: PropTypes.shape({
      counts: PropTypes.shape({
        organizations: PropTypes.object.isRequired,
        keywords: PropTypes.object.isRequired
      }).isRequired
    }).isRequired
  }).isRequired,

  search: PropTypes.func.isRequired
}

export default CatalogFacetsList
