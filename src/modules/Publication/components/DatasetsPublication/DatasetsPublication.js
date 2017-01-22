import React, { Component } from 'react'
import cx from 'classnames'

import DatasetsToBePublished from '../DatasetsToBePublished/DatasetsToBePublished'
import PublishedDatasets from '../PublishedDatasets/PublishedDatasets'

import { container, header, success, warning, error } from './DatasetsPublication.css'

class DatasetsPublication extends Component {

  render() {
    const { datasets, title, update, organizationId, status } = this.props

    const headerStyle = cx(header, {
      [success]: status === 'success',
      [warning]: status === 'warning',
      [error]: status === 'error',
    })

    return (
        <div className={container}>
          <div className={headerStyle}>
            <div>{title}</div>
            <div>{datasets.length}</div>
          </div>
          {status === 'error' ? <DatasetsToBePublished datasets={datasets} update={() => update()} organizationId={organizationId} /> : <PublishedDatasets datasets={datasets} />}
        </div>
    )
  }
}

export default DatasetsPublication
