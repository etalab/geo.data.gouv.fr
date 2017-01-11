import React from 'react'
import { Link } from 'react-router'
import { link } from './OrganizationProducersPreview.css'

const OrganizationProducersPreview = ({ organizationId, producers }) => {
  return (
    <div>
      <div><strong>{producers.length}</strong> producteurs sont associés à votre organisation</div>
      <ul>
        {producers.map((producer, idx) => <li key={idx}>{producer._id}</li>)}
      </ul>
      <Link className={link} to={`/publication/${organizationId}/producers`}>Associer des producteurs</Link>
    </div>
  )
}

export default OrganizationProducersPreview
