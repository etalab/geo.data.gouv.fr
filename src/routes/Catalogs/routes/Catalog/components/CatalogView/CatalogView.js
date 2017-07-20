import React from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'

import SearchInput from 'common/components/SearchInput'

import CatalogStatistics from '../CatalogStatistics'
import CatalogFacetsList from '../CatalogFacetsList'
import CatalogHarvestsView from '../CatalogHarvestsView'

import styles from './CatalogView.scss'

class CatalogView extends React.PureComponent {
  static propTypes = {
    catalog: PropTypes.shape({
      name: PropTypes.string.isRequired,

      service: PropTypes.shape({
        location: PropTypes.string.isRequired
      }).isRequired
    }),

    metrics: PropTypes.object.isRequired,
    harvests: PropTypes.object.isRequired,

    search: PropTypes.func.isRequired,
    getHarvests: PropTypes.func.isRequired,
    syncCatalog: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { getHarvests, catalog } = this.props

    getHarvests(catalog._id)
  }

  onSearch = query => {
    const { search, catalog } = this.props

    search({
      q: query,
      catalog: catalog.name,
    })
  }

  render() {
    const { catalog, metrics, harvests, search, syncCatalog } = this.props

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
            <CatalogFacetsList catalog={catalog} metrics={metrics} search={search} />
          </div>

          <div className={styles.section}>
            <CatalogHarvestsView
              catalog={catalog}
              harvests={harvests}
              syncCatalog={syncCatalog}
            />
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
