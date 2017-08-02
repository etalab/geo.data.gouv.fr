import React from 'react'
import PropTypes from 'prop-types'
import { find } from 'lodash'

import styles from './OtherProducersItem.scss'

const OtherProducersItem = ({ organizations, producer }) => {
  const organization = find(organizations, organization => organization._id === producer.associatedTo)

  return (
    <div className={styles.item}>
      Rattaché à <a href={`https://www.data.gouv.fr/fr/organizations/${organization._id}/`}>
        {organization.name}
      </a>
    </div>
  )
}

OtherProducersItem.propTypes = {
  organizations: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  producer: PropTypes.shape({
    associatedTo: PropTypes.string.isRequired
  }).isRequired
}

export default OtherProducersItem
