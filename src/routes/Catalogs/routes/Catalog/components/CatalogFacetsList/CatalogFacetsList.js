import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import CatalogFacets from '../CatalogFacets'

const CatalogFacetsList = ({ catalog, metrics, onSearch, t }) => {
  const { organizations, keywords } = metrics.records.counts

  const onOrganizationSearch = facet => onSearch({
    organization: facet.value,
    catalog: catalog.name
  })

  const onKeywordSearch = facet => onSearch({
    keyword: facet.value,
    catalog: catalog.name
  })

  return (
    <div>
      <CatalogFacets
        title={t('CatalogFacetsList.organizationsTitle')}
        type='organization'
        filters={organizations}
        onSearch={onOrganizationSearch}
      />
      <CatalogFacets
        title={t('CatalogFacetsList.keywordsTitle')}
        type='keyword'
        filters={keywords}
        onSearch={onKeywordSearch}
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

  onSearch: PropTypes.func.isRequired,

  t: PropTypes.func.isRequired
}

export default translate('Catalogs.Catalog')(CatalogFacetsList)
