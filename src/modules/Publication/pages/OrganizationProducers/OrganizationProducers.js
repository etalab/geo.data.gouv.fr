import React, { Component } from 'react'
import Publishing from '../../components/Publishing/Publishing'
import PublishingSection from '../../components/PublishingSection/PublishingSection'
import Producers from '../../../../components/Producers/Producers'
import Errors from '../../../../components/Errors/Errors'
import { getUser, getOrganization } from '../../../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../../../helpers/components'

class PublishingDatasets extends Component {
  constructor(props) {
    super(props)
    this.state = {errors: []}
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
    const { params: { organizationId } } = this.props
    const { user, organization, errors } = this.state

    if (errors.length) return <Errors errors={errors} />
    if (user && organization) {
      const organizationLogo = user.organizations.find(organization => organization.id === organizationId).logo
      const component = <Producers organization={organization} />
      const section = <PublishingSection pageTitle={`${organization.name} - Producteurs`} title={'Producteurs'} component={component} toWait={organization} />

      return <Publishing user={user} organizationLogo={organizationLogo} section={section} />
      }

    return null
  }
}

export default PublishingDatasets
