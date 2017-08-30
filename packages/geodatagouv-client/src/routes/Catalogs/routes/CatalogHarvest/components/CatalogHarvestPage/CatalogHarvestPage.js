import React from 'react'
import PropTypes from 'prop-types'

import Loader from 'common/components/Loader'

import CatalogHarvestView from '../CatalogHarvestView'

import styles from './CatalogHarvestPage.scss'

class CatalogHarvestPage extends React.PureComponent {
  static propTypes = {
    catalog: PropTypes.shape({
      catalog: PropTypes.object,

      pending: PropTypes.bool.isRequired,

      error: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object
      ]).isRequired
    }).isRequired,

    harvest: PropTypes.shape({
      harvest: PropTypes.object,

      pending: PropTypes.bool.isRequired,

      error: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object
      ]).isRequired
    }).isRequired,

    match: PropTypes.shape({
      params: PropTypes.shape({
        catalogId: PropTypes.string.isRequired,
        harvestId: PropTypes.string.isRequired
      })
    }).isRequired,

    getCatalog: PropTypes.func.isRequired,
    getHarvest: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { match, getCatalog, getHarvest } = this.props

    getCatalog(match.params.catalogId)
    getHarvest(match.params.catalogId, match.params.harvestId)
  }

  render() {
    const { catalog, harvest } = this.props

    return (
      <div className={styles.container}>
        <Loader isLoading={catalog.pending || harvest.pending} error={catalog.error || harvest.error}>
          <CatalogHarvestView
            catalog={catalog.catalog}
            harvest={harvest.harvest}
          />
        </Loader>
      </div>
    )
  }
}

export default CatalogHarvestPage
