import React from 'react'

import CenteredMap from '../../../../components/CenteredMap'
import styles from './SpatialExtentMap.css'

function SpatialExtentMap ({ extent }) {
  const feature = { type: 'Feature', geometry: extent, properties: {} }
  const fc = { type: 'FeatureCollection', features: [feature] }

  return (
    <div className={styles.container}>
      <CenteredMap vectors={fc} className={styles.map} frozen={true} />
    </div>
  )
}

export default SpatialExtentMap
