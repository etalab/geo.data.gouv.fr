import React from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

import MarkdownPreview from 'common/components/MarkdownPreview'
import DatasetInfo from 'common/components/DatasetInfo'

import styles from './DatasetHeader.scss'

const DatasetHeader = ({ dataset, t }) => {
  const { title, description, purpose, lineage, inspireTheme } = dataset.metadata

  return (
    <div className={styles.container}>
      <div className={styles.inspireThemeHead}>
        <div className={styles.resume}>
          <h1 className={styles.title}>{title}</h1>

          <DatasetInfo metadata={dataset.metadata} displayType />
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

      <div>
        <div>
          {description && (
            <MarkdownPreview markdown={description} />
          )}
          <p>
            <b>{t('components.DatasetHeader.purpose')} :</b> {purpose || t('Common:enums.unknownData.notSpecified')}
          </p>
          <p>
            <b>{t('components.DatasetHeader.dataOrigin')} :</b> {lineage || t('Common:enums.unknownData.notSpecified', { context: 'female' })}
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

  t: PropTypes.func.isRequired
}

export default translate('Dataset')(DatasetHeader)
