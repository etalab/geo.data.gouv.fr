import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import { doneSince } from 'common/helpers/doneSince'
import { getLicense } from 'common/helpers/dataGouvChecks'

import styles from './DatasetInfo.scss'

const DatasetInfo = ({ metadata, t, displayType, className }) => {
  const dataType = t(`Common:enums.dataTypes.${metadata.type}`, {
    defaultValue: metadata.type
  })
  const license = getLicense(metadata.license)
  const updatedAt = metadata.revisionDate || metadata.creationDate
  const updatedAtLabel = updatedAt
    ? doneSince(updatedAt)
    : t('enums.unknownData.unknown', { context: 'female' })

  return (
    <div className={`${styles.container} ${className}`}>
      {displayType && (
        <div>
          {t('components.DatasetInfo.type')} : <b>{dataType || t('enums.unknownData.unknown')}</b>
        </div>
      )}
      <div>
        {t('components.DatasetInfo.license')} : <b>{license.name ? (
          <a href={license.link} target='_blank'>{license.name}</a>
        ) : license}</b>
      </div>
      <div>
        {t('components.DatasetInfo.lastUpdate')} : <b>{updatedAtLabel}</b>
      </div>
    </div>
  )
}

DatasetInfo.propTypes = {
  metadata: PropTypes.shape({
    type: PropTypes.string,
    license: PropTypes.string,
    creationDate: PropTypes.string,
    revisionDate: PropTypes.string
  }).isRequired,

  t: PropTypes.func.isRequired,

  displayType: PropTypes.bool,

  className: PropTypes.string
}

DatasetInfo.defaultProps = {
  displayType: false,
  className: ''
}

export default translate()(DatasetInfo)
