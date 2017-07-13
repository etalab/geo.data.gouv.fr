import React from 'react'
import DocumentTitle from 'react-document-title'

import OrganizationPreview from '../OrganizationPreview/OrganizationPreview'

import { container } from './Organizations.scss'

const Organizations = ({ organizations }) => {
  return (
    <DocumentTitle title={'Vos organisations'}>
      <div className={container}>
        {organizations.map((organization, idx) => <OrganizationPreview key={idx} organization={organization} />)}
      </div>
    </DocumentTitle>
  )
}

export default Organizations
