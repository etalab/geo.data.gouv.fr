/* eslint-disable react/prop-types */

import React, { Component } from 'react'

import Layout from '../../components/Layout/Layout'
import OrganizationDatasets from '../../components/OrganizationDatasets/OrganizationDatasets'

import Errors from '../../../../components/Errors/Errors'

import { getUser, fetchOrganizationPublished, fetchOrganizationNotPublishedYet, fetchOrganizationPublishedByOthers } from '../../../../fetch/fetch'
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
      this.updatePublished(),
      this.updatePublishedByOthers(),
      this.updateNotPublishedYet()
    ])
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  updateUser() {
    return waitForDataAndSetState(getUser(), this, 'user')
  }

  updatePublished() {
    return waitForDataAndSetState(fetchOrganizationPublished(this.state.organizationId), this, 'published')
  }

  updateNotPublishedYet() {
    return waitForDataAndSetState(fetchOrganizationNotPublishedYet(this.state.organizationId), this, 'notPublishedYet')
  }

  updatePublishedByOthers() {
    return waitForDataAndSetState(fetchOrganizationPublishedByOthers(this.state.organizationId), this, 'publishedByOthers')
  }

  updateDatasets() {
    return Promise.all([
      this.updatePublished(),
      this.updateNotPublishedYet()
    ])
  }

  render() {
    const { organizationId, user, published, notPublishedYet, publishedByOthers, errors } = this.state
    const datasets = { published, notPublishedYet, publishedByOthers }

    if (errors.length) {
      return <Errors errors={errors} />
    }

    if (!user) {
      return <Errors errors={['Vous devez être authentifié pour accéder à cette page']} /> // TODO: Vous devez être authentifié
    }

    const candidateOrganization = user.organizations.find(organization => organization.id === organizationId)
    if (!candidateOrganization) return null

    if (!datasets.published || !datasets.notPublishedYet || !datasets.publishedByOthers) return null

    return (
      <Layout user={user} organization={candidateOrganization} pageTitle={candidateOrganization.name} title={'Jeux de données'}>
        <OrganizationDatasets {...datasets} update={() => this.updateDatasets()} organizationId={organizationId} />
      </Layout>
    )
  }
}

export default PublishingDatasets
