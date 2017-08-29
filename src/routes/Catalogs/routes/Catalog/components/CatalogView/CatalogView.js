import React from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

import SearchInput from 'common/components/SearchInput'

import CatalogHarvestsContainer from '../../containers/CatalogHarvestsContainer'

import CatalogStatistics from '../CatalogStatistics'
import CatalogFacetsList from '../CatalogFacetsList'

import styles from './CatalogView.scss'

class CatalogView extends React.PureComponent {
  static propTypes = {
    catalog: PropTypes.shape({
      name: PropTypes.string.isRequired,

      service: PropTypes.shape({
        location: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,

    metrics: PropTypes.object.isRequired,

    onSearch: PropTypes.func.isRequired,

    t: PropTypes.func.isRequired
  }

  onSearch = query => {
    const { onSearch, catalog } = this.props

    onSearch({
      q: query,
      catalog: catalog.name
    })
  }

  render() {
    const { catalog, metrics, onSearch, t } = this.props

    return (
      <div>
        <Helmet title={catalog.name} />
        <div className={styles.header}>
          <h1>{catalog.name}</h1>

          <a href={catalog.service.location} target='_blank'>
            {t('CatalogView.catalogService')}
          </a>
        </div>

        <div className={styles.section}>
          <CatalogStatistics metrics={metrics} />
        </div>

        <div className={styles.section}>
          <CatalogFacetsList catalog={catalog} metrics={metrics} onSearch={onSearch} />
        </div>

        <div className={styles.section}>
          <CatalogHarvestsContainer catalog={catalog} />
        </div>

        <div className={styles.section}>
          <h2>{t('CatalogView.catalogSearchTitle')}</h2>
          <SearchInput onSearch={this.onSearch} hasButton />
        </div>
      </div>
    )
  }
}

export default translate('Catalogs.Catalog')(CatalogView)
