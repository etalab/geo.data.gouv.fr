import React from 'react'
import OrganizationPreview from './OrganizationPreview'
import { container } from './Organizations.css'

const Organizations = ({ organizations }) => {
  return (
    <div className={container}>
      {organizations.map((organization, idx) => <OrganizationPreview key={idx} organization={organization} />)}
    </div>
  )
}

export default Organizations
