import React from 'react'
import PropTypes from 'prop-types'

import Loader from 'common/components/Loader'

import CatalogView from '../CatalogView'

import styles from './CatalogPage.scss'

const CatalogPage = ({ catalog, metrics, search }) => (
  <div className={styles.container}>
    <Loader loading={catalog.pending || metrics.pending} error={catalog.error || metrics.error}>
      <CatalogView
        catalog={catalog.catalog}
        metrics={metrics.metrics}
        search={search}
      />
    </Loader>
  </div>
)

CatalogPage.propTypes = {
  catalog: PropTypes.shape({
    catalog: PropTypes.object,

    pending: PropTypes.bool.isRequired,

    error: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object
    ]).isRequired,
  }).isRequired,

  metrics: PropTypes.shape({
    metrics: PropTypes.object,

    pending: PropTypes.bool.isRequired,

    error: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object
    ]).isRequired
  }).isRequired,

  search: PropTypes.func.isRequired
}

export default CatalogPage
