import React from 'react'
import PropTypes from 'prop-types'
import createRouterContext from 'react-router-test-context'
import { mount } from 'enzyme'

import Errors from '../../../../../components/Errors/Errors'

import datasets from '../../../../../fetch/__test__/organizationDatasets.json'
import notPublishedYet from '../../../../../fetch/__test__/organizationNotPublishedYetDatasets.json'

const PublishingDatasets = require('proxyquire')('../PublishingDatasets', {
  '../../../../fetch/fetch': require('../../../../../fetch/__mocks__/fetch')
}).default

describe('<PublishingDatasets />', () => {
  describe('When all goes well', () => {
    it('should assign metrics, organizationDetail and catalog to this.state', () => {
      const wrapper = mount(
        <PublishingDatasets match={{ params: { organizationId: '1' } }} />, {
          context: createRouterContext(),
          childContextTypes: {
            router: PropTypes.object
          }
        }
      )

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
      const wrapper = mount(
        <PublishingDatasets match={{ params: { organizationId: '1' } }} />, {
          context: createRouterContext(),
          childContextTypes: {
            router: PropTypes.object
          }
        }
      )

      return wrapper.instance()
        .componentWillMount()
        .then(() => {
          expect(wrapper).to.contains.html('<div>Données en attente de publication</div>')
          expect(wrapper).to.contains.html('<div>Données publiées</div>')
          expect(wrapper).to.contains.html('<div>Données publiées par une autre organisation</div>')
        })
    })
  })

  describe('At least one error exists', () => {
    it('should display all errors', () => {
      const errors = ['organizationId is required']
      const err = <Errors errors={errors} />
      const wrapper = mount(<PublishingDatasets match={{ params: { organizationId: null } }} />)

      return wrapper.instance()
        .componentWillMount()
        .then(() => {
          expect(wrapper.state('errors')).to.eql(errors)
          expect(wrapper).to.contain(err)
        })
    })
  })
})
