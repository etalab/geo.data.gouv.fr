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
  const logoStyle = {maxHeight:'120px',maxWidth:'200px',marginBottom:'10px',borderRadius:'60px'}

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
      const logo = <img style={logoStyle} src="https://www.data.gouv.fr/s/avatars/2015-02-22/2905e7e4347143a590190ba991f81705/inspire-logo-100.png" alt="passerelle-inspire"/>
      const wrapper = shallow(<OrganizationCard organization={user.organizations[0]} metrics={metrics} sourceCatalog={sourceCatalog} producers={producers} errors={[]} />)

      expect(wrapper).to.contain(logo)
    })

    it('should display default logo when organization logo is undefined', () => {
      const logo = <img style={logoStyle} src="https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png" alt="passerelle-inspire"/>
      user.organizations[0].logo = null
      const wrapper = shallow(<OrganizationCard organization={user.organizations[0]} metrics={metrics} sourceCatalog={sourceCatalog} producers={producers} errors={[]} />)

      expect(wrapper).to.contain(logo)
    })
  })

})
