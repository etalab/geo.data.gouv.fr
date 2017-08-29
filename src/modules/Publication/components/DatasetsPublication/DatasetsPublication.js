/* eslint-disable react/prop-types */

import React, { Component } from 'react'
import cx from 'classnames'

import DatasetsToBePublished from '../DatasetsToBePublished/DatasetsToBePublished'
import PublishedDatasets from '../PublishedDatasets/PublishedDatasets'

import { container, header, success, warning, error } from './DatasetsPublication.scss'

class DatasetsPublication extends Component {
  render() {
    const { datasets, title, update, organizationId, status } = this.props
    const sortedDatasets = datasets.sort((a, b) => a.title.localeCompare(b.title))
    const headerStyle = cx(header, {
      [success]: status === 'success',
      [warning]: status === 'warning',
      [error]: status === 'error'
    })

    return (
      <div className={container}>
        <div className={headerStyle}>
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
