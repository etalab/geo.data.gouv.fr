/* eslint-disable react/prop-types */

import React from 'react'

import Layout from '../../components/Layout/Layout'
import ManageOrganization from '../../components/ManageOrganization/ManageOrganization'
import ActivateOrganization from '../../components/ActivateOrganization/ActivateOrganization'
import Errors from '../../../../components/Errors/Errors'

export default function PureOrganization(props) {
  const { organizationDetails, organization, user, metrics } = props

  if (!user) {
    return <Errors errors={['Vous devez être authentifié pour accéder à cette page']} /> // TODO: Vous devez être authentifié
  }

  if (!organizationDetails) {
    return <Errors errors={['Cette organisation n\'existe pas sur data.gouv.fr']} /> // TODO: Cette organisation n'existe pas sur data.gouv.fr
  }

  if (!organization || !metrics) {
    return (
      <Layout user={user} organization={organizationDetails} pageTitle={organizationDetails.name} title={organizationDetails.name}>
        <ActivateOrganization organizationId={organizationDetails.id} onActivation={() => props.onActivation()} />
      </Layout>
    )
  }

  return (
    <Layout user={user} organization={organizationDetails} pageTitle={organizationDetails.name} title={organizationDetails.name}>
      <ManageOrganization {...props} />
    </Layout>
  )
}
