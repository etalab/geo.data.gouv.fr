import React from 'react'
import OrganizationCard from '../OrganizationCard'
import Errors from '../../Errors/Errors'
import OrganizationMetrics from '../OrganizationMetrics'
import { shallow } from 'enzyme'

import organizationDetail from '../../../fetch/__test__/organization.json'
import metrics from '../../../fetch/__test__/organizationMetrics.json'
import user from '../../../fetch/__test__/user.json'

describe('<OrganizationCard />', () => {
  const { sourceCatalog, producers } = organizationDetail

  describe('Logo', () => {
    it('should display organization logo', () => {
      const wrapper = shallow(<OrganizationCard organization={user.organizations[0]} metrics={metrics} sourceCatalog={sourceCatalog} producers={producers} errors={[]} />)

      expect(wrapper).to.have.html().match(/inspire-logo-100.png/)
    })

    it('should display default logo when organization logo is undefined', () => {
      user.organizations[0].logo = null
      const wrapper = shallow(<OrganizationCard organization={user.organizations[0]} metrics={metrics} sourceCatalog={sourceCatalog} producers={producers} errors={[]} />)

      expect(wrapper).to.have.html().match(/No_picture_available.png/)
    })
  })

})
