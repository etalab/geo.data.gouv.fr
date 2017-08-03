import React from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

import MarkdownPreview from 'common/components/MarkdownPreview'

import { doneSince } from 'common/helpers/doneSince'
import { getLicense } from 'common/helpers/dataGouvChecks'

import styles from './DatasetHeader.scss'

const DatasetHeader = ({ dataset, t, i18n }) => {
  const { title, description, type, purpose, lineage, inspireTheme } = dataset.metadata

  const revisionDate = doneSince(dataset.revisionDate)
  const license = getLicense(dataset.metadata.license)
  const dataType = i18n.exists(`Common:dataTypes.${type}`)
    ? t(`Common:dataTypes.${type}`)
    : type

  return (
    <div className={styles.container}>
      <div className={inspireTheme ? styles.inspireThemeHead : styles.head}>
        <div className={styles.resume}>
          <h1 className={styles.title}>{title}</h1>

          <div className={styles.infos}>
            <div>
              {t('DatasetHeader.type')} : <span>{dataType || t('DatasetHeader.unknown')}</span>
            </div>
            <div>
              {t('DatasetHeader.license')} : <span>{license.name ? (
                <a href={license.link} target='_blank'>{license.name}</a>
              ) : license}</span>
            </div>
            <div>
              {t('DatasetHeader.lastUpdate')} : <span>{revisionDate}</span>
            </div>
          </div>
        </div>

        {inspireTheme && (
          <div className={styles.theme}>
            <div>
              <img src={`/assets/inspire-icons/${inspireTheme.id}.svg`} alt='inspire-theme-icon' />
            </div>
            <div>
              <a href={inspireTheme.uri} target='_blank'>{inspireTheme.label.fr}</a>
            </div>
          </div>
        )}
      </div>

      <div className={styles.section}>
        <div>
          {description && (
            <MarkdownPreview markdown={description} />
          )}
          <p>
            <b>{t('DatasetHeader.objectif')} :</b> {purpose || t('Common:unknownData.notSpecified')}
          </p>
          <p>
            <b>{t('DatasetHeader.dataOrigin')} :</b> {lineage || t('Common:unknownData.notSpecified', { context: 'female' })}
          </p>
        </div>
      </div>
    </div>
  )
}

DatasetHeader.propTypes = {
  dataset: PropTypes.shape({
    metadata: PropTypes.shape({
      title: PropTypes.string.isRequired,
      type: PropTypes.string,
      description: PropTypes.string,
      purpose: PropTypes.string,
      lineage: PropTypes.string,
      inspireTheme: PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.shape({
          fr: PropTypes.string.isRequired
        }).isRequired
      })
    }).isRequired
  }).isRequired,

  t: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired
}

export default translate('Dataset')(DatasetHeader)
