import React from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'

import SearchInput from 'common/components/SearchInput'

import CatalogStatistics from '../CatalogStatistics'
import OrganizationsSection from 'common/modules/Catalogs/components/OrganizationsSection/OrganizationsSection'
import HarvestsSection from 'common/modules/Catalogs/components/HarvestsSection/HarvestsSection'

import styles from './CatalogView.scss'

const CatalogView = ({ catalog, metrics, search }) => {
  const onSearch = query => search(query, catalog.name)

  return (
    <DocumentTitle title={catalog.name}>
      <div>
        <div className={styles.header}>
          <h1>{catalog.name}</h1>

          <a href={catalog.service.location} target='_blank'>
            Accès direct au service du catalogue
          </a>
        </div>

        <div className={styles.section}>
          <CatalogStatistics metrics={metrics} />
        </div>

        <div className={styles.section}>
          <OrganizationsSection metrics={metrics} catalog={catalog}/>
        </div>

        <div className={styles.section}>
          <HarvestsSection catalog={catalog} />
        </div>

        <div className={styles.section}>
          <h2>Rechercher dans les jeux de données du catalogue</h2>
          <SearchInput onSearch={onSearch} hasButton />
        </div>
      </div>
    </DocumentTitle>
  )
}

CatalogView.propTypes = {
  catalog: PropTypes.shape({
    name: PropTypes.string.isRequired,

    service: PropTypes.shape({
      location: PropTypes.string.isRequired
    }).isRequired
  }),

  metrics: PropTypes.shape({
  }),

  search: PropTypes.func.isRequired
}

export default CatalogView
