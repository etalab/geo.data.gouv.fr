import React from 'react'
import OrganizationCardSection from '../OrganizationCardSection'
import Errors from '../../Errors/Errors'
import OrganizationMetrics from '../OrganizationMetrics'
import { shallow } from 'enzyme'

import organizationDetail from '../../../fetch/__test__/organization.json'
import metrics from '../../../fetch/__test__/organizationMetrics.json'
import user from '../../../fetch/__test__/user.json'

describe('<OrganizationCardSection />', () => {
  const { sourceCatalog, producers } = organizationDetail

  describe('At least one error exists', () => {
    it('should display all errors', () => {
      const errors = ['une erreur', 'une deuxième erreur']
      const err = <Errors errors={errors} />
      const wrapper = shallow(<OrganizationCardSection organization={user.organizations[0]} metrics={metrics} sourceCatalog={sourceCatalog} producers={producers} errors={errors} />)

      expect(wrapper).to.contain(err)
    })
  })

  describe('No error', () => {
    it('should display metrics', () => {
      const organizationMetrics = <OrganizationMetrics organizationId={user.organizations[0].id} metrics={metrics} />
      const wrapper = shallow(<OrganizationCardSection organization={user.organizations[0]} metrics={metrics} sourceCatalog={sourceCatalog} producers={producers} errors={[]} />)

      expect(wrapper).to.contain(organizationMetrics)
    })
  })

})
