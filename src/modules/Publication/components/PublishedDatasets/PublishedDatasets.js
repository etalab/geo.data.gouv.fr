import React from 'react'
import { Link } from 'react-router'

import { data } from './PublishedDatasets.css'

const PublishedDatasets = ({ datasets }) => {
  if (!datasets.length) return <div className={data}>Aucun jeu de données.</div>
  return (
    <div>
      {datasets.map((dataset, idx) =>
        <div key={idx} className={data}>
          <Link to={`/search/${dataset._id}`}>{dataset.title}</Link>
          <a href={dataset.remoteUrl} target="blank">Fiche data.gouv.fr</a>
        </div>
      )}
    </div>
  )
}

export default PublishedDatasets
