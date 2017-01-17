import React, { Component } from 'react'

import Layout from '../../components/Layout/Layout'
import ManageOrganization from '../../components/ManageOrganization/ManageOrganization'

import { fetchOrganizationMetrics, getOrganizationDetail, getUser, getOrganization } from '../../../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../../../helpers/components'
import { acceptNotFound } from '../../../../helpers/promises'
import Errors from '../../../../components/Errors/Errors'

class Organization extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      organization: null,
      organizationDetail: null,
      metrics: null,
      catalog: null,
      errors: [],
    }
  }

  componentWillMount() {
    return Promise.all([
      this.updateUser(),
      this.updateMetrics(),
      this.updateOrganization(),
      this.updateOrganizationDetail(),
    ])
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  updateUser() {
    return waitForDataAndSetState(getUser(), this, 'user')
  }


  updateMetrics() {
    return waitForDataAndSetState(acceptNotFound(fetchOrganizationMetrics(this.props.params.organizationId)), this, 'metrics')
  }

  updateOrganization() {
    return waitForDataAndSetState(acceptNotFound(getOrganization(this.props.params.organizationId)), this, 'organization')
  }

  updateOrganizationDetail() {
    return waitForDataAndSetState(acceptNotFound(getOrganizationDetail(this.props.params.organizationId)), this, 'organizationDetail')
  }

  render() {
    const { user, organization, organizationDetail, metrics, errors } = this.state

    if (errors.length) {
      return <Errors errors={errors} />
    }

    if (!user) {
      return <Errors errors={['Vous devez être authentifié pour accéder à cette page']} /> // TODO: Vous devez être authentifié
    }

    if (!organizationDetail) {
      return <Errors errors={['Cette organisation n\'existe pas sur data.gouv.fr']} /> // TODO: Cette organisation n'existe pas sur data.gouv.fr
    }

    if (!organization || !metrics) {
      return <Errors errors={['Cette organisation n\'est pas active sur inspire.beta.gouv.fr']} /> // TODO: Cette organisation n'est pas active sur inspire.beta.gouv.fr
    }

    return (
      <Layout user={user} organizationLogo={organizationDetail.logo} pageTitle={organizationDetail.name} title={organizationDetail.name}>
        <ManageOrganization {...this.state} />
      </Layout>
    )
  }
}

export default Organization
