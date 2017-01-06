import React, { Component } from 'react'
import Publishing from './Publishing'
import PublishingSection from './PublishingSection'
import OrganizationDatasets from '../Organization/OrganizationDatasets'
import Errors from '../Errors/Errors'
import { getUser, fetchOrganizationPublished, fetchOrganizationNotPublishedYet, fetchOrganizationPublishedByOthers } from '../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components'

class PublishingDatasets extends Component {
  constructor(props) {
    super(props)
    this.state = {errors: []}
  }

  componentWillMount() {
    return Promise.all([
      this.updateUser(),
      this.updatePublished(),
      this.updatePublishedByOthers(),
      this.updateNotPublishedYet(),
    ])
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  updateUser() {
    return waitForDataAndSetState(getUser(), this, 'user')
  }

  updatePublished() {
    return waitForDataAndSetState(fetchOrganizationPublished(this.props.params.organizationId), this, 'published')
  }

  updateNotPublishedYet() {
    return waitForDataAndSetState(fetchOrganizationNotPublishedYet(this.props.params.organizationId), this, 'notPublishedYet')
  }

  updatePublishedByOthers() {
    return waitForDataAndSetState(fetchOrganizationPublishedByOthers(this.props.params.organizationId), this, 'publishedByOthers')
  }

  render() {
    const { params: { organizationId } } = this.props
    const { user, published, notPublishedYet, publishedByOthers, errors } = this.state
    const datasets = {published, notPublishedYet, publishedByOthers}

    if (errors.length) {
      return <Errors errors={errors} />
    }
    else if (user) {
      const component = <OrganizationDatasets {...datasets} organizationId={organizationId} />
      const organization = user.organizations.find(organization => organization.id === organizationId)
      const section = <PublishingSection pageTitle={organization.name} title={'Jeux de données'} component={component} toWait={(published && notPublishedYet && publishedByOthers)} />

      return <Publishing user={user} organization={organization} section={section} />
    } else {
      return null
    }
  }
}

export default PublishingDatasets
