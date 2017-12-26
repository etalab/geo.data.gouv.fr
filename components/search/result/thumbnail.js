import React from 'react'
import PropTypes from 'prop-types'

import {GEODATA_API_URL} from '@env'

const Thumbnail = ({recordId, thumbnails}) => {
  const hasThumbnail = thumbnails && thumbnails.length > 0
  const thumbnail = hasThumbnail ?
    `${GEODATA_API_URL}/records/${recordId}/thumbnails/${thumbnails[0].originalUrlHash}` :
    '/static/images/datasets/default-thumbnail.svg'

  return (
    <div>
      <img src={thumbnail} alt='' />

      <style jsx>{`
        div {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
          overflow: hidden;

          height: 180px;
          width: 180px;

          @media (max-width: 767px) {
            width: 100%;

            ${!hasThumbnail && (`
              display: none;
            `)}
          }
        }

        img {
          display: flex;
          max-height: 100%;

          @media (max-width: 767px) {
            max-width: 100%;
            max-height: none;
            height: auto;
            margin: auto;
          }
        }
      `}</style>
    </div>
  )
}

Thumbnail.propTypes = {
  thumbnails: PropTypes.arrayOf(PropTypes.shape({
    originalUrlHash: PropTypes.isRequired
  })),
  recordId: PropTypes.string.isRequired
}

Thumbnail.defaultProps = {
  thumbnails: null
}

export default Thumbnail
