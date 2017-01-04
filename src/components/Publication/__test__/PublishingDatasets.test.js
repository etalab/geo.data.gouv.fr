import React from 'react'
import Errors from '../../Errors/Errors'
import OrganizationDatasets from '../../Organization/OrganizationDatasets'
import { mount } from 'enzyme'

import datasets from '../../../fetch/__test__/organizationDatasets.json'
import notPublishedYet from '../../../fetch/__test__/organizationNotPublishedYetDatasets.json'

const PublishingDatasets = require('proxyquire')('../PublishingDatasets', {
  '../../fetch/fetch': require('../../../fetch/__mocks__/fetch')
}).default

describe.only('<PublishingDatasets />', () => {

  describe('When all goes well', () => {

    it('should assign metrics, organizationDetail and catalog to this.state', () => {
      const wrapper = mount(<PublishingDatasets params={{organizationId: '1'}} />)

      return wrapper.instance()
        .componentWillMount()
        .then(() => {
          expect(wrapper.state('errors')).to.eql([])
          expect(wrapper.state('published')).to.equal(datasets)
          expect(wrapper.state('notPublishedYet')).to.equal(notPublishedYet)
          expect(wrapper.state('publishedByOthers')).to.equal(datasets)
        })
    })

    it('should render a OrganizationDatasets component', () => {
      const component = <OrganizationDatasets organizationId={'1'} published={datasets} notPublishedYet={notPublishedYet} publishedByOthers={datasets} />
      const wrapper = mount(<PublishingDatasets params={{organizationId: '1'}} />)

      return wrapper.instance()
        .componentWillMount()
        .then(() => {
          expect(wrapper).to.contain(component)
        })
    })
  })

  describe('At least one error exists', () => {
    it('should display all errors', () => {
      const errors = ['organizationId is required']
      const err = <Errors errors={errors} />
      const wrapper = mount(<PublishingDatasets params={{organizationId: null}} />)

      return wrapper.instance()
        .componentWillMount()
        .then(() => {
          expect(wrapper.state('errors')).to.eql(errors)
          expect(wrapper).to.contain(err)
        })
    })
  })
})
