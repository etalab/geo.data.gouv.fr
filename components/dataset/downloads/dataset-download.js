import React from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'
import strRightBack from 'underscore.string/strRightBack'

import DownloadIcon from 'react-icons/lib/fa/download'
import PreviewIcon from 'react-icons/lib/fa/eye'
import FailIcon from 'react-icons/lib/fa/close'

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
    <div>
      {distribution.available ? (
        <div className='container'>
          <div className='main'>
            <div className='download-icon'>
              <DownloadIcon />
            </div>
            <div>
              <b>{name}</b>
              {formats.map(format => (
                <div key={format.label} className='download'>
                  <Button href={`${link}?format=${format.format}&projection=${format.projection}`} download>
                    {format.label}
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className='preview'>
            <Button>
              <PreviewIcon style={{ verticalAlign: -2 }} /> {t('downloads.openPreview')}
            </Button>
          </div>
        </div>
      ) : (
        <div className='container'>
          <div className='fail-icon'>
            <FailIcon />
          </div>
          <div>
            <b>{name}</b>
            {t('downloads.unavailable')}
          </div>
        </div>
      )}

      <style jsx>{`
        @import 'colors';

        .container {
          display: flex;
          flex-wrap: wrap;
        }

        .main {
          display: flex;
        }

        .download-icon {
          font-size: 4.51em;
          color: $blue;
          opacity: 0.2;
          margin-right: 10px;
        }

        .fail-icon {
          font-size: 4.51em;
          color: $red;
          opacity: 0.2;
          margin-right: 10px;
          margin-top: -12px;
        }

        b {
          display: block;
          margin-bottom: 2px;
          overflow-wrap: break-word;
          word-wrap: break-word;
          word-break: break-word;
        }

        .download {
          display: inline-block;
          margin: 5px 5px 0 0;
        }

        .preview {
          margin: 5px 0 0 auto;

          @media (max-width: 1180px) {
            flex: 1 1 100%;
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
