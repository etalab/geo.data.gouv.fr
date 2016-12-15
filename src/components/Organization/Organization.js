import React, { Component } from 'react'
import OrganizationCard from './OrganizationCard'
import { fetchOrganizationMetrics, getOrganization, fetchCatalog } from '../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components'

class Organization extends Component {
  constructor(props) {
    super(props)
    this.state = {
      organizationDetail: null,
      metrics: null,
      catalog: null,
      errors: [],
    }
  }

  componentWillMount() {
    return Promise.all([
      this.updateMetrics(),
      this.updateOrganization(),
    ])
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  updateMetrics() {
    return waitForDataAndSetState(fetchOrganizationMetrics(this.props.organization.id), this, 'metrics')
  }

  updateOrganization() {
    return waitForDataAndSetState(getOrganization(this.props.organization.id), this, 'organizationDetail')
      .then(() => waitForDataAndSetState(fetchCatalog(this.state.organizationDetail.sourceCatalog), this, 'catalog'))
  }

  render() {
    const { organization } = this.props
    const { organizationDetail, metrics, catalog, errors } = this.state

    if (organization && catalog && metrics) {
      return <OrganizationCard organization={organization} metrics={metrics} {...organizationDetail} errors={errors} />
    }
    return null
  }
}

export default Organization
