import React from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'

import Warning from 'common/components/Warning'

import DatasetHeader from '../DatasetHeader'

import { isWarningStatus, statusTranslate } from './status'

import styles from './DatasetView.scss'

const DatasetView = ({ dataset }) => {
  const translated = statusTranslate[dataset.metadata.status]

  return (
    <DocumentTitle title={dataset.metadata.title}>
      <div>
        {isWarningStatus(dataset.metadata.status) && (
          <Warning title={`Attention ce jeu de données est considéré comme ${translated.status} par son producteur`}>
            {translated.consequences}
          </Warning>
        )}
        <div className={styles.container}>
          <DatasetHeader dataset={dataset} />
        </div>
      </div>
    </DocumentTitle>
  )
}

DatasetView.propTypes = {
  dataset: PropTypes.shape({
    metadata: PropTypes.shape({
      title: PropTypes.string.isRequired,
      status: PropTypes.string
    }).isRequired
  }).isRequired
}

export default DatasetView
