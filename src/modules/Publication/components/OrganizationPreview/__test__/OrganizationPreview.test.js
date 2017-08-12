import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { shallow } from 'enzyme'

import OrganizationPreview from '../OrganizationPreview'

import organizationDetail from '../../../../../fetch/__test__/organization.json'
import metrics from '../../../../../fetch/__test__/organizationMetrics.json'
import user from '../../../../../fetch/__test__/user.json'

describe('<OrganizationPreview />', () => {
  const { sourceCatalog, producers } = organizationDetail

  describe('Logo', () => {
    it('should display organization logo', () => {
      const wrapper = shallow(
        <MemoryRouter>
          <OrganizationPreview organization={user.organizations[0]} metrics={metrics} sourceCatalog={sourceCatalog} producers={producers} errors={[]} />
        </MemoryRouter>
      )

      expect(wrapper).to.have.html().match(/inspire-logo-100.png/)
    })

    it('should display default logo when organization logo is undefined', () => {
      user.organizations[0].logo = null

      const wrapper = shallow(
        <MemoryRouter>
          <OrganizationPreview organization={user.organizations[0]} metrics={metrics} sourceCatalog={sourceCatalog} producers={producers} errors={[]} />
        </MemoryRouter>
      )

      expect(wrapper).to.have.html().match(/no-img.png/)
    })
  })
})
