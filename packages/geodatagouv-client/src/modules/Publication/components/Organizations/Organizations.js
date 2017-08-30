/* eslint-disable react/prop-types */

import React from 'react'
import { Helmet } from 'react-helmet'

import OrganizationPreview from '../OrganizationPreview/OrganizationPreview'

import { container } from './Organizations.scss'

const Organizations = ({ organizations }) => {
  return (
    <div className={container}>
      <Helmet title={'Vos organisations'} />
      {organizations.map((organization, idx) => <OrganizationPreview key={idx} organization={organization} />)}
    </div>
  )
}

export default Organizations
