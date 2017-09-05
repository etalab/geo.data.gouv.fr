import React from 'react'
import PropTypes from 'prop-types'

import CenteredMap from 'common/components/CenteredMap'

import styles from './DatasetSpatialExtent.scss'

const DatasetSpatialExtent = ({ extent }) => {
  const features = {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: extent,
      properties: {}
    }]
  }

  return (
    <div className={styles.container}>
      <CenteredMap vectors={features} className={styles.map} frozen />
    </div>
  )
}

DatasetSpatialExtent.propTypes = {
  extent: PropTypes.object.isRequired
}

export default DatasetSpatialExtent
