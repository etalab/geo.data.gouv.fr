import React from 'react'
import { Link } from 'react-router'
import cx from 'classnames'
import { container, header, dataStyle, success, warning, error } from './PublishedDatasets.css'

const PublishedDatasets = ({ datasets, title, status }) => {
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
        <div>
          {datasets.map((data, idx) =>
            <div key={idx} className={dataStyle}>
              <Link to={`datasets/${data._id}`}>{data.title}</Link>
              {data.remoteUrl ? <a href={data.remoteUrl} target="blank">Fiche data.gouv.fr</a> : null}
            </div>
          )}
        </div>
      </div>
  )
}

export default PublishedDatasets
