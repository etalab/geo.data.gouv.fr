import React from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'
import moment from 'moment'

import { doneSince } from 'common/helpers/doneSince'
import { getLicense } from 'common/helpers/dataGouvChecks'

import styles from './DatasetTechnicalInfo.scss'

const DatasetTechnicalInfo = ({ dataset, status, t, i18n }) => {
  const {
    type,
    updateFrequency,
    creationDate,
    revisionDate,
    topicCategory,
    equivalentScaleDenominator,
    spatialResolution
  } = dataset.metadata

  const license = getLicense(dataset.metadata.license)

  const frequency = t([`Common:enums.frequencies.${updateFrequency}`, 'Common:enums.unknownData.unknown'], {
    context: 'female'
  })
  const topicCat = t([`Common:enums.topicCategories.${topicCategory}`, 'Common:enums.unknownData.notSpecified'], {
    context: 'female'
  })
  const dataType = t(`Common:enums.dataTypes.${type}`, {
    defaultValue: type
  })

  const createDate = creationDate
    ? moment(creationDate).format('DD/MM/YYYY')
    : t('Common:enums.unknownData.unknown', { context: 'female' })

  return (
    <div className={styles.container}>
      <div>
        <h4>{t('components.DatasetTechnicalInfo.lifeCycleTitle')}</h4>

        <div>{t('components.DatasetTechnicalInfo.updateFrequency')} : <b>{frequency}</b></div>
        <div>{t('components.DatasetTechnicalInfo.creationDate')} : <b>{createDate}</b></div>
        <div>{t('components.DatasetTechnicalInfo.revisionDate')} : <b>{revisionDate ? doneSince(revisionDate) : createDate}</b></div>
      </div>

      <div className={styles.other}>
        <h4>{t('components.DatasetTechnicalInfo.otherTitle')}</h4>

        <div>{t('components.DatasetTechnicalInfo.topicCategory')} : <b>{topicCat}</b></div>
        <div>{t('components.DatasetTechnicalInfo.type')} : <b>{dataType || t('Common:enums.unknownData.unknown')}</b></div>

        <div>
          {t('components.DatasetTechnicalInfo.license')} : {license.name ? (
            <a href={license.link}>{license.name}</a>
          ) : (
            <b>{license}</b>
          )}
        </div>

        {status && (
          <div>{t('components.DatasetTechnicalInfo.status')} : <b>{t(`enums.status.${status}`)}</b></div>
        )}

        {equivalentScaleDenominator && (
          <div>{t('components.DatasetTechnicalInfo.scale')} : <b>1 / {equivalentScaleDenominator}</b></div>
        )}

        {spatialResolution && (
          <div>{t('components.DatasetTechnicalInfo.resolution')} : <b>{spatialResolution.value} {spatialResolution.unit}</b></div>
        )}
      </div>
    </div>
  )
}

DatasetTechnicalInfo.propTypes = {
  dataset: PropTypes.shape({
    metadata: PropTypes.shape({
      type: PropTypes.string.isRequired,
      updateFrequency: PropTypes.string,
      creationDate: PropTypes.string,
      revisionDate: PropTypes.string,
      topicCategory: PropTypes.string,
      equivalentScaleDenominator: PropTypes.number,
      spatialResolution: PropTypes.shape({
        value: PropTypes.number.isRequired,
        unit: PropTypes.string.isRequired
      })
    }).isRequired
  }).isRequired,

  status: PropTypes.string,

  t: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired
}

export default translate('Dataset')(DatasetTechnicalInfo)
