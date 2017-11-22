import React from 'react'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import { translate } from 'react-i18next'

const CenteredMap = dynamic(import('../centered-map'), {
  ssr: false,
  loading: translate()(({ t }) => t('loading'))
})

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
    <div>
      <CenteredMap vectors={features} frozen />

      <style jsx>{`
        div {
          width: 100%;
          position: relative;
          height: 290px;

          @media (max-width: 1480px) {
            height: 250px;
          }

          @media (max-width: 1080px) {
            height: 200px;
          }

          @media (max-width: 768px) {
            height: 250px;
          }
        }
      `}</style>
    </div>
  )
}

DatasetSpatialExtent.propTypes = {
  extent: PropTypes.object.isRequired
}

export default DatasetSpatialExtent
