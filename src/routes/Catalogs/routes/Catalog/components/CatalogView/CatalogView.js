import React from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'

import SearchInput from 'common/components/SearchInput'

import StatisticsSection from 'common/modules/Catalogs/components/StatisticsSection/StatisticsSection'
import OrganizationsSection from 'common/modules/Catalogs/components/OrganizationsSection/OrganizationsSection'
import HarvestsSection from 'common/modules/Catalogs/components/HarvestsSection/HarvestsSection'

import styles from './CatalogView.scss'

class CatalogView extends React.PureComponent {
  static propTypes = {
    catalog: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }),

    metrics: PropTypes.shape({
    }),

    search: PropTypes.func.isRequired
  }

  onSearch = query => {
    const { search, catalog } = this.props

    search(query, catalog.name)
  }

  render() {
    const { catalog, metrics } = this.props

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
            <StatisticsSection metrics={metrics} />
          </div>

          <div className={styles.section}>
            <OrganizationsSection metrics={metrics} catalog={catalog}/>
          </div>

          <div className={styles.section}>
            <HarvestsSection catalog={catalog} />
          </div>

          <div className={styles.section}>
            <h2>Rechercher dans les jeux de données du catalogue</h2>
            <SearchInput onSearch={this.onSearch} hasButton />
          </div>
        </div>
      </DocumentTitle>
    )
  }
}

export default CatalogView
