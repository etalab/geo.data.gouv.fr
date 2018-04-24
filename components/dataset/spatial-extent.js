import React from 'react'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import {translate} from 'react-i18next'

const CenteredMap = dynamic(import('../centered-map'), {
  ssr: false,
  loading: translate()(({t}) => t('loading'))
})

const SpatialExtent = ({extent}) => {
  const data = {
    type: 'Feature',
    geometry: extent
  }

  return (
    <div>
      <div className='map'>
        <CenteredMap data={data} frozen circlePaint={null} />
      </div>

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
      `}</style>
    </div>
  )
}

SpatialExtent.propTypes = {
  extent: PropTypes.object.isRequired
}

export default SpatialExtent
