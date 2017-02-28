import React from 'react'

import OrganizationPreview from '../../../../components/OrganizationPreview/OrganizationPreview'

import { list } from './OrganizationsList.css'

const OrganizationsList = ({ organizations }) => {
  return (
    <div className={list}>
      {organizations.map((organization, idx) => <OrganizationPreview key={idx} organization={organization} />)}
    </div>
  )
}

export default OrganizationsList
