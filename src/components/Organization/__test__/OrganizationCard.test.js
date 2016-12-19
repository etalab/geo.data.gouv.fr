import React from 'react'
import OrganizationCard from '../OrganizationCard'
import OrganizationErrors from '../OrganizationErrors'
import OrganizationMetrics from '../OrganizationMetrics'
import { shallow } from 'enzyme'

import organizationDetail from '../../../fetch/__test__/organization.json'
import metrics from '../../../fetch/__test__/organizationMetrics.json'
import user from '../../../fetch/__test__/user.json'

describe('<OrganizationCard />', () => {
  const { sourceCatalog, producers } = organizationDetail

  describe('At least one error exists', () => {
    it('should display all errors', () => {
      const errors = ['une erreur', 'une deuxième erreur']
      const organizationErrors = <OrganizationErrors errors={errors} />
      const wrapper = shallow(<OrganizationCard organization={user.organizations[0]} metrics={metrics} sourceCatalog={sourceCatalog} producers={producers} errors={errors} />)

      expect(wrapper).to.contain(organizationErrors)
    })
  })

  describe('No error', () => {
    it('should display metrics', () => {
      const organizationMetrics = <OrganizationMetrics metrics={metrics} />
      const wrapper = shallow(<OrganizationCard organization={user.organizations[0]} metrics={metrics} sourceCatalog={sourceCatalog} producers={producers} errors={[]} />)

      expect(wrapper).to.contain(organizationMetrics)
    })
  })

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
