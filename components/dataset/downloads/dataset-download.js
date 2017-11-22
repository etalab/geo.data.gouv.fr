import React from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'
import strRightBack from 'underscore.string/strRightBack'

import DownloadIcon from 'react-icons/lib/fa/long-arrow-down'
import PreviewIcon from 'react-icons/lib/fa/eye'

import formats from '../../../lib/formats'

import Button from '../../button'

import { GEODATA_API_URL } from '@env'

export const DatasetDownload = ({ distribution, t }) => {
  let link, layerName

  if (distribution.type === 'file-package') {
    layerName = strRightBack(distribution.layer, '/')
    link = `${GEODATA_API_URL}/file-packages/${distribution.hashedLocation}/${layerName}/download`
  }

  if (distribution.type === 'wfs-featureType') {
    link = `${GEODATA_API_URL}/services/${distribution.service}/feature-types/${distribution.typeName}/download`
  }

  const name = layerName || distribution.typeName

  return (
    <div className='container'>
      <h5>{name}</h5>
      {distribution.available ? (
        <div className='distributions'>
          {formats.map(format => (
            <div key={format.label}>
              <Button href={`${link}?format=${format.format}&projection=${format.projection}`} download>
                <DownloadIcon /> {format.label}
              </Button>
            </div>
          ))}

          <div className='preview'>
            <Button>
              <PreviewIcon style={{ verticalAlign: -2 }} /> {t('downloads.openPreview')}
            </Button>
          </div>
        </div>
      ) : t('downloads.unavailable')}

      <style jsx>{`
        @import 'colors';

        .container {
          border-left: 2px solid $blue;
          margin-bottom: 1em;
          padding-left: 0.5em;
        }

        h5 {
          margin: 0;
        }

        .distributions {
          display: flex;
          flex-wrap: wrap;

          div {
            margin: 5px 5px 0 0;
          }

          .preview {
            margin: 5px 0 0 auto;

            @media (max-width: 768px) {
              flex: 1 1 100%;
            }
          }
        }
      `}</style>
    </div>
  )
}

DatasetDownload.propTypes = {
  distribution: PropTypes.shape({
    type: PropTypes.string.isRequired,
    available: PropTypes.bool.isRequired,
    hashedLocation: PropTypes.string,
    service: PropTypes.string,
    typeName: PropTypes.string
  }).isRequired,

  t: PropTypes.func.isRequired
}

export default translate('dataset')(DatasetDownload)
