/* eslint-disable react/prop-types */

import React from 'react'
import { Link } from 'react-router-dom'
import { link } from './OrganizationProducersPreview.scss'

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
