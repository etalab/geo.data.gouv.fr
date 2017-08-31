/* eslint-disable react/prop-types */

import React, { Component } from 'react'

import DatasetsToBePublished from '../DatasetsToBePublished/DatasetsToBePublished'
import PublishedDatasets from '../PublishedDatasets/PublishedDatasets'

import styles from './DatasetsPublication.scss'

class DatasetsPublication extends Component {
  render() {
    const { datasets, title, update, organizationId, status } = this.props
    const sortedDatasets = datasets.sort((a, b) => a.title.localeCompare(b.title))

    return (
      <div className={styles.container}>
        <div className={`${styles.header} ${styles[status]}`}>
          <div>{title}</div>
          <div>{datasets.length}</div>
        </div>
        {status === 'error'
          ? <DatasetsToBePublished datasets={sortedDatasets} update={() => update()} organizationId={organizationId} />
          : <PublishedDatasets datasets={sortedDatasets} />}
      </div>
    )
  }
}

export default DatasetsPublication
