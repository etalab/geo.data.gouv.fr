import React from 'react'

const OrganizationProducers = ({ organizationId, producers }) => {
  return (
    <div><strong>{producers.length}</strong> producteurs sont associés à votre organisation</div>
  )
}

export default OrganizationProducers
