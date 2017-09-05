/* eslint-disable react/prop-types */

import React, { Component } from 'react'

import OrganizationHome from '../../components/OrganizationHome/OrganizationHome'

import { fetchOrganizationMetrics, getOrganizationDetail, getUser, getOrganization } from '../../../../fetch/fetch'
import withResolver from '../../../../helpers/withResolver'
import { acceptNotFound } from '../../../../helpers/promises'

class Organization extends Component {
  constructor(props) {
    super(props)
    this.state = { dependencies: this.getDependencies() }
  }

  getDependencies() {
    const organizationId = this.props.match.params.organizationId

    return {
      user: getUser(),
      metrics: acceptNotFound(fetchOrganizationMetrics(organizationId)),
      organization: acceptNotFound(getOrganization(organizationId)),
      organizationDetails: acceptNotFound(getOrganizationDetail(organizationId))
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
