import React from 'react'
import PropTypes from 'prop-types'

import withFetch from '../../hoc/with-fetch'

import Link from '../../link'

const SourceProducers = ({organization}) => (
  <div>
    {organization.producers && organization.producers.length > 0 ? (
      <div>
        <strong>{organization.producers.length}</strong> producteurs sont associés à votre organisation
        <ul>
          {organization.producers.map(producer => (
            <li key={producer._id}>{producer._id}</li>
          ))}
        </ul>
      </div>
    ) : (
      <p>
        Aucun producteur n’est associé à votre organisation.
      </p>
    )}

    <Link prefetch href={`/publication/producers?oid=${organization._id}`} as={`/publication/${organization._id}/producers`}>
      <a>
        Associer des producteurs
      </a>
    </Link>
  </div>
)

SourceProducers.propTypes = {
  organization: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    producers: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired
    })).isRequired
  }).isRequired
}

export default withFetch(
  data => ({
    organization: data
  })
)(SourceProducers)
