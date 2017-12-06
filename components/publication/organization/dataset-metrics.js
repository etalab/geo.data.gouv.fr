import React from 'react'
import PropTypes from 'prop-types'

import withFetch from '../../hoc/with-fetch'

import Link from '../../link'

const DatasetMetrics = ({ organization, metrics }) => (
  <div>
    <p>
      <strong>{metrics.published}</strong> jeux de données sont <strong>publiés et accessibles</strong> sur <a href='https://data.gouv.fr'>data.gouv.fr</a>
    </p>
    <p>
      <strong>{metrics.notPublishedYet}</strong> jeux de données sont <strong>en attente de publication</strong>
    </p>
    <p>
      <strong>{metrics.publishedByOthers}</strong> jeux de données sont <strong>publiés par d'autres producteurs</strong>
    </p>

    <Link href={`/publication/producers?oid=${organization._id}`} as={`/publication/${organization._id}/datasets`}>
      <a>
        Publier des données
      </a>
    </Link>
  </div>
)

DatasetMetrics.propTypes = {
  organization: PropTypes.shape({
    _id: PropTypes.string.isRequired
  }).isRequired,
  metrics: PropTypes.shape({
    published: PropTypes.number.isRequired,
    notPublishedYet: PropTypes.number.isRequired,
    publishedByOthers: PropTypes.number.isRequired
  }).isRequired
}

export default withFetch(
  ([ organization, metrics ]) => ({
    organization,
    metrics
  })
)(DatasetMetrics)
