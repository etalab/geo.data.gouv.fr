import React from 'react'
import DocumentTitle from 'react-document-title'
import OrganizationPreview from './OrganizationPreview'
import { container } from './Organizations.css'

const Organizations = ({ organizations }) => {
  return (
    <DocumentTitle title={'Vos organizations'}>
      <div className={container}>
        {organizations.map((organization, idx) => <OrganizationPreview key={idx} organization={organization} />)}
      </div>
    </DocumentTitle>
  )
}

export default Organizations
