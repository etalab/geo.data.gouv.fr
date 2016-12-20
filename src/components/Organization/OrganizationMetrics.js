import React from 'react'

const OrganizationMetrics = ({ organizationId, metrics }) => {
  const { published, notPublishedYet, publishedByOthers} = metrics

  return (
    <div>
      <p><strong>{published}</strong> jeux de données sont <strong>publiés et accessibles</strong> sur <a href="data.gouv.fr">data.gouv.fr</a></p>
      <p><strong>{notPublishedYet}</strong> jeux de données sont <strong>en attente de publication</strong></p>
      <p><strong>{publishedByOthers}</strong> jeux de données sont <strong>publiés par d'autres producteurs</strong></p>
    </div>
  )
}

export default OrganizationMetrics
