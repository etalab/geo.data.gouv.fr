import React from 'react'
import { mount } from 'enzyme'

import organizationDetail from '../../../fetch/__test__/organization.json'
import metrics from '../../../fetch/__test__/organizationMetrics.json'
import catalog from '../../../fetch/__test__/catalog.json'
import user from '../../../fetch/__test__/user.json'

const Organization = require('proxyquire')('../Organization', {
  '../../fetch/fetch': require('../../../fetch/__mocks__/fetch')
}).default

describe('<Organization />', () => {

  describe('When all goes well', () => {

    it('should assign metrics, organizationDetail and catalog to this.state', () => {
      const wrapper = mount(<Organization organization={user.organizations[0]} />)

      return wrapper.instance()
        .componentWillMount()
        .then(() => {
          expect(wrapper.state('errors')).to.eql([])
          expect(wrapper.state('metrics')).to.equal(metrics)
          expect(wrapper.state('organizationDetail')).to.equal(organizationDetail)
          expect(wrapper.state('catalog')).to.equal(catalog)
        })
    })
  })
})
