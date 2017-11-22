import React from 'react'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import { translate } from 'react-i18next'

const CenteredMap = dynamic(import('../centered-map'), {
  ssr: false,
  loading: translate()(({ t }) => t('loading'))
})

const SpatialExtent = ({ extent, scale, resolution, t }) => {
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
      <div className='map'>
        <CenteredMap vectors={features} frozen />
      </div>

      {(scale || resolution) && (
        <div className='infos'>
          {scale && <div>
            <b>{t('labels.scale')}</b> 1 / {scale}
          </div>}

          {resolution && <div>
            <b>{t('labels.resolution')}</b> {resolution.value} {t(`enums.resolutionUnits.${resolution.unit}`, {
              count: resolution.value
            })}
          </div>}
        </div>
      )}

      <style jsx>{`
        @import 'colors';

        .map {
          width: 100%;
          position: relative;
          height: 250px;

          @media (max-width: 1480px) {
            height: 230px;
          }

          @media (max-width: 1080px) {
            height: 200px;
          }

          @media (max-width: 768px) {
            height: 250px;
          }
        }

        .infos {
          margin-top: 1em;
        }
      `}</style>
    </div>
  )
}

SpatialExtent.propTypes = {
  extent: PropTypes.object.isRequired,
  scale: PropTypes.number,
  resolution: PropTypes.shape({
    value: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired
  }),

  t: PropTypes.func.isRequired
}

export default translate('dataset')(SpatialExtent)
