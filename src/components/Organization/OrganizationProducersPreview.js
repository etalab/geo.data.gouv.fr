import React from 'react'
import { Link } from 'react-router'
import { link } from './OrganizationProducersPreview.css'

const OrganizationProducersPreview = ({ organizationId, producers }) => {
  return (
    <div>
      <div><strong>{producers.length}</strong> producteurs sont associés à votre organisation</div>
      <Link className={link} to={`/publication/${organizationId}/datasets`}>Associer des producteurs</Link>
    </div>
  )
}

export default OrganizationProducersPreview
