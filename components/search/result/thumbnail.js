import React from 'react'
import PropTypes from 'prop-types'
import getConfig from 'next/config'

const {publicRuntimeConfig: {
  GEODATA_API_URL
}} = getConfig()

const Thumbnail = ({id, thumbnail}) => {
  const url = thumbnail ?
    `${GEODATA_API_URL}/records/${id}/thumbnails/${thumbnail}` :
    '/static/images/datasets/default-thumbnail.svg'

  return (
    <div>
      <img src={url} alt='' />

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

            ${!thumbnail && (`
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
  id: PropTypes.string.isRequired,
  thumbnail: PropTypes.string
}

Thumbnail.defaultProps = {
  thumbnail: null
}

export default Thumbnail
