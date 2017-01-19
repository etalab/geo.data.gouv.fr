import React, { Component } from 'react'

import OrganizationHome from '../../components/OrganizationHome/OrganizationHome'

import { fetchOrganizationMetrics, getOrganizationDetail, getUser, getOrganization } from '../../../../fetch/fetch'
import withResolver from '../../../../helpers/withResolver'

class Organization extends Component {
  constructor(props) {
    super(props)
    this.state = { dependencies: this.getDependencies() }
  }

  getDependencies() {
    const { params: { organizationId } } = this.props

    return {
      user: getUser(),
      metrics: fetchOrganizationMetrics(organizationId),
      organization: getOrganization(organizationId),
      organizationDetails: getOrganizationDetail(organizationId)
    }
  }

  update() {
    this.setState({ dependencies: this.getDependencies() })
  }

  render() {
    const OrganizationWithResolver = withResolver(OrganizationHome, this.state.dependencies)
    return <OrganizationWithResolver onActivation={() => this.update()} />
  }
}

export default Organization
