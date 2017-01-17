import React, { Component } from 'react'

import Layout from '../../components/Layout/Layout'
import Producers from '../../../../components/Producers/Producers'
import Errors from '../../../../components/Errors/Errors'

import { getUser, getOrganization } from '../../../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../../../helpers/components'


class PublishingDatasets extends Component {
  constructor(props) {
    super(props)
    const { params: { organizationId } } = props
    this.state = { errors: [], organizationId }
  }

  componentWillMount() {
    return Promise.all([
      this.updateUser(),
      this.updateOrganization(),
    ])
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  updateUser() {
    return waitForDataAndSetState(getUser(), this, 'user')
  }

  updateOrganization() {
    return waitForDataAndSetState(getOrganization(this.props.params.organizationId), this, 'organization')
  }

  render() {

    const { user, organization, errors, organizationId } = this.state

    if (errors.length) {
      return <Errors errors={errors} />
    }

    if (!user) {
      return <Errors errors={['Vous devez être authentifié pour accéder à cette page']} /> // TODO: Vous devez être authentifié
    }

    if (!organization) return null;
    const organizationLogo = user.organizations.find(organization => organization.id === organizationId).logo

    return (
      <Layout user={user} organizationLogo={organizationLogo} pageTitle={`${organization.name} - Producteurs`} title={'Producteurs'}>
        <Producers organization={organization} />
      </Layout>
    )
  }
}

export default PublishingDatasets
