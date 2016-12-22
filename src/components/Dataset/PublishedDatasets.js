import React from 'react'
import { Link } from 'react-router'
import { data } from './PublishedDatasets.css'

const PublishedDatasets = ({ datasets }) => {
  return (
    <div>
      {datasets.map((dataset, idx) =>
        <div key={idx} className={data}>
          <Link to={`/datasets/${dataset._id}`}>{dataset.title}</Link>
          <a href={dataset.remoteUrl} target="blank">Fiche data.gouv.fr</a>
        </div>
      )}
    </div>
  )
}

export default PublishedDatasets
