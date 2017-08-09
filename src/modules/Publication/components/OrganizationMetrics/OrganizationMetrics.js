/* eslint-disable react/prop-types */

import React from 'react'
import { Link } from 'react-router-dom'
import { link } from './OrganizationMetrics.scss'

const OrganizationMetrics = ({ organizationId, metrics }) => {
  const { published, notPublishedYet, publishedByOthers } = metrics

  return (
    <div>
      <p><strong>{published}</strong> jeux de données sont <strong>publiés et accessibles</strong> sur <a href='https://data.gouv.fr'>data.gouv.fr</a></p>
      <p><strong>{notPublishedYet}</strong> jeux de données sont <strong>en attente de publication</strong></p>
      <p><strong>{publishedByOthers}</strong> jeux de données sont <strong>publiés par d'autres producteurs</strong></p>
      <Link className={link} to={`/publication/${organizationId}/datasets`}>Publier des données</Link>
    </div>
  )
}

export default OrganizationMetrics
