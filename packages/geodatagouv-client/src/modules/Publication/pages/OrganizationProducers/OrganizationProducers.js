/* eslint-disable react/prop-types */

import React, { Component } from 'react'

import Layout from '../../components/Layout/Layout'
import Producers from '../../../../components/Producers/Producers'
import Errors from '../../../../components/Errors/Errors'

import { getUser, getOrganization } from '../../../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../../../helpers/components'

class PublishingDatasets extends Component {
  constructor(props) {
    super(props)
    const organizationId = props.match.params.organizationId
    this.state = { errors: [], organizationId }
  }

  componentWillMount() {
    return Promise.all([
      this.updateUser(),
      this.updateOrganization()
    ])
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  updateUser() {
    return waitForDataAndSetState(getUser(), this, 'user')
  }

  updateOrganization() {
    return waitForDataAndSetState(getOrganization(this.state.organizationId), this, 'organization')
  }

  render() {
    const { user, organization, errors, organizationId } = this.state

    if (errors.length) {
      return <Errors errors={errors} />
    }

    if (!user) {
      return <Errors errors={['Vous devez être authentifié pour accéder à cette page']} /> // TODO: Vous devez être authentifié
    }

    if (!organization) return null
    const candidateOrganization = user.organizations.find(org => org.id === organizationId)

    return (
      <Layout user={user} organization={candidateOrganization} pageTitle={`${organization.name} - Producteurs`} title={'Producteurs'}>
        <Producers organization={organization} />
      </Layout>
    )
  }
}

export default PublishingDatasets
