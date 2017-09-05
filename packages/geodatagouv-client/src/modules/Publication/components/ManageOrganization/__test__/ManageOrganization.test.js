import React from 'react'
import { shallow } from 'enzyme'

import ManageOrganization from '../ManageOrganization'
import OrganizationMetrics from '../../OrganizationMetrics/OrganizationMetrics'

import metrics from '../../../../../fetch/__test__/organizationMetrics.json'
import user from '../../../../../fetch/__test__/user.json'
import catalog from '../../../../../fetch/__test__/catalog.json'

describe('<ManageOrganization />', () => {
  describe('No error', () => {
    it('should display metrics', () => {
      const organizationMetrics = <OrganizationMetrics organizationId={user.organizations[0]._id} metrics={metrics} />
      const wrapper = shallow(<ManageOrganization organization={user.organizations[0]} metrics={metrics} catalog={catalog} />)

      expect(wrapper).to.contain(organizationMetrics)
    })
  })
})
