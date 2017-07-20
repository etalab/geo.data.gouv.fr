import React from 'react'
import PropTypes from 'prop-types'

import Loader from 'common/components/Loader'

import CatalogHarvestView from '../CatalogHarvestView'

const CatalogHarvestPage = ({ catalog, harvest }) => (
  <Loader loading={catalog.pending || harvest.pending} error={catalog.error || harvest.error}>
    <CatalogHarvestView
      catalog={catalog.catalog}
      harvest={harvest.harvest}
    />
  </Loader>
)

CatalogHarvestPage.propTypes = {
  catalog: PropTypes.shape({
    catalog: PropTypes.object,

    pending: PropTypes.bool.isRequired,

    error: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object
    ]).isRequired,
  }).isRequired,

  harvest: PropTypes.shape({
    harvest: PropTypes.object,

    pending: PropTypes.bool.isRequired,

    error: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object
    ]).isRequired
  }).isRequired,
}

export default CatalogHarvestPage
