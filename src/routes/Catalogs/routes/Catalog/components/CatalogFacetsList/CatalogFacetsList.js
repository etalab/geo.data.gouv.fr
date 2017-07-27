import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import CatalogFacets from '../CatalogFacets'

const CatalogFacetsList = ({ catalog, metrics, search, t }) => {
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
        title={t('CatalogFacetsList.organizationsTitle')}
        filters={organizations}
        search={onOrganizationSearch}
      />
      <CatalogFacets
        title={t('CatalogFacetsList.keywordsTitle')}
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

  search: PropTypes.func.isRequired,

  t: PropTypes.func.isRequired
}

export default translate('Catalogs.Catalog')(CatalogFacetsList)
