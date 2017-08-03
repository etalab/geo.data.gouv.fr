import React from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'
import moment from 'moment'

import { doneSince } from 'common/helpers/doneSince'
import { getLicense } from 'common/helpers/dataGouvChecks'

import { frequencies } from './frequencies'

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

  const frequency = updateFrequency ? frequencies[updateFrequency] : t('Common:unknownData.unknown', { context: 'female' })
  const createDate = creationDate ? moment(creationDate).format('DD/MM/YYYY') : t('Common:unknownData.unknown', { context: 'female' })
  const license = getLicense(dataset.metadata.license)
  const dataType = i18n.exists(`Common:dataTypes.${type}`)
    ? t(`Common:dataTypes.${type}`)
    : type
  const topicCat = i18n.exists(`Common:topicCategories.${topicCategory}`)
    ? t(`Common:topicCategories.${topicCategory}`)
    : t('Common:unknownData.notSpecified', { context: 'female' })

  return (
    <div className={styles.container}>
      <div>
        <h4>{t('DatasetTechnicalInfo.lifeCycleTitle')}</h4>

        <div>{t('DatasetTechnicalInfo.frequencyUpdate')} : <b>{frequency}</b></div>
        <div>{t('DatasetTechnicalInfo.creationDate')} : <b>{createDate}</b></div>
        <div>{t('DatasetTechnicalInfo.revisionDate')} : <b>{revisionDate ? doneSince(revisionDate) : createDate}</b></div>
      </div>

      <div className={styles.other}>
        <h4>{t('DatasetTechnicalInfo.otherTitle')}</h4>

        <div>{t('DatasetTechnicalInfo.topicCategory')} : <b>{topicCat}</b></div>
        <div>{t('DatasetTechnicalInfo.type')} : <b>{dataType || t('Common:unknownData.unknown')}</b></div>

        <div>
          {t('DatasetTechnicalInfo.license')} : {license.name ? (
            <a href={license.link}>{license.name}</a>
          ) : (
            <b>{license}</b>
          )}
        </div>

        {status && (
          <div>{t('DatasetTechnicalInfo.status')} : <b>{status.status}</b></div>
        )}

        {equivalentScaleDenominator && (
          <div>{t('DatasetTechnicalInfo.scale')} : <b>1 / {equivalentScaleDenominator}</b></div>
        )}

        {spatialResolution && (
          <div>{t('DatasetTechnicalInfo.resolution')} : <b>{spatialResolution.value} {spatialResolution.unit}</b></div>
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
    }).isRequired,
  }).isRequired,

  status: PropTypes.shape({
    status: PropTypes.string.isRequired
  }),

  t: PropTypes.func.isRequired,
  i18n: PropTypes.func.isRequired
}

export default translate('Dataset')(DatasetTechnicalInfo)
