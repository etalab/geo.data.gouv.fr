import React from 'react'
import { find } from 'lodash'
import { item } from './OtherProducersItem.scss'

const OtherProducersItem = ({ organizations, producer }) => {
  const organization = find(organizations, (organization) => organization._id === producer.associatedTo)
  return <div className={item}>Rattaché à <a href={`https://www.data.gouv.fr/fr/organizations/${organization._id}/`}>{organization.name}</a></div>
}

export default OtherProducersItem
