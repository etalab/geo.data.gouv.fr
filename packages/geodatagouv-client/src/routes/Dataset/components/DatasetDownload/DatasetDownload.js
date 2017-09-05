import React from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'
import strRightBack from 'underscore.string/strRightBack'

import styles from './DatasetDownload.scss'

const { INSPIRE_API_URL } = process.env

const FORMATS = [
  { label: 'GeoJSON', format: 'GeoJSON', projection: 'WGS84' },
  { label: 'SHP/L93', format: 'SHP', projection: 'Lambert93' },
  { label: 'SHP/W84', format: 'SHP', projection: 'WGS84' },
  { label: 'KML', format: 'KML', projection: 'WGS84' },
  { label: 'CSV', format: 'CSV', projection: 'WGS84' }
]

export const DatasetDownload = ({ distribution, isPreview, setPreview, resetPreview, t }) => {
  let link, layerName

  if (distribution.type === 'file-package') {
    layerName = strRightBack(distribution.layer, '/')
    link = `${INSPIRE_API_URL}/file-packages/${distribution.hashedLocation}/${layerName}/download`
  }

  if (distribution.type === 'wfs-featureType') {
    link = `${INSPIRE_API_URL}/services/${distribution.service}/feature-types/${distribution.typeName}/download`
  }

  const name = layerName || distribution.typeName

  return (
    <div className={styles.download}>
      <div className={styles.title}>{name}</div>
      <div>
        <div className={styles.container}>
          <div>
            <div>{t('components.DatasetDownload.title')}<i className='download icon' /></div>
            <div className={styles.formats}>
              {!distribution.available ? (
                <p>{t('components.DatasetDownload.unavailable')}</p>
              ) : (
                FORMATS.map((format, idx) => (
                  <a
                    key={idx}
                    href={`${link}?format=${format.format}&projection=${format.projection}`}>{format.label}</a>
                ))
              )}
            </div>
          </div>
          {!distribution.available ? (
            <button className={styles.viewerButton} disabled>{t('components.DatasetDownload.buttonText')}</button>
          ) : (
            <button
              className={styles.viewerButton}
              onClick={isPreview ? resetPreview : () => setPreview({ distribution, link })}
            >
              {t('components.DatasetDownload.buttonText')} {isPreview && (
                <i className='unhide icon' />
              )}
            </button>
          )}
        </div>
      </div>
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

  isPreview: PropTypes.bool,

  setPreview: PropTypes.func.isRequired,
  resetPreview: PropTypes.func.isRequired,

  t: PropTypes.func.isRequired
}

DatasetDownload.defaultProps = {
  isPreview: false
}

export default translate('Dataset')(DatasetDownload)
