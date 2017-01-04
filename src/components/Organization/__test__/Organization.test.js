import React from 'react'
import { mount } from 'enzyme'

import organizationDetail from '../../../fetch/__test__/organizationDetail.json'
import metrics from '../../../fetch/__test__/organizationMetrics.json'
import user from '../../../fetch/__test__/user.json'

const Organization = require('proxyquire')('../Organization', {
  '../../fetch/fetch': require('../../../fetch/__mocks__/fetch')
}).default

describe('<Organization />', () => {

  describe('When all goes well', () => {

    it('should assign metrics, organizationDetail and catalog to this.state', () => {
      const wrapper = mount(<Organization params={{organizationId: '1'}} />)

      return wrapper.instance()
        .componentWillMount()
        .then(() => {
          expect(wrapper.state('errors')).to.eql([])
          expect(wrapper.state('user')).to.equal(user)
          expect(wrapper.state('metrics')).to.equal(metrics)
          expect(wrapper.state('organizationDetail')).to.equal(organizationDetail)
        })
    })
  })
})
