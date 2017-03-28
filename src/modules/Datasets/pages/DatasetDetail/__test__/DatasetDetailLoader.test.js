import React from 'react'
import { mount, shallow } from 'enzyme'

import CircularProgress from '../../../../../components/CircularProgress/CircularProgress'
import Errors from '../../../../../components/Errors/Errors'
import datasetMock from '../../../../../fetch/__test__/dataset.json'

const DatasetDetailLoader = require('proxyquire')('../DatasetDetailLoader', {
  '../../../../fetch/fetch': require('../../../../../fetch/__mocks__/fetch')
}).default

describe('<DatasetDetailLoader />', () => {

  describe('Loading dataset', () => {
    it('should display a <CircularProgress />', () => {
      const wrapper = mount(<DatasetDetailLoader params={{ datasetId: '1' }} />)
      const progress = <CircularProgress />
      expect(wrapper.containsMatchingElement(progress)).to.be.true
    })
  })

  describe('Loaded dataset', () => {
    it('should display dataset title', () => {
      const wrapper = mount(<DatasetDetailLoader params={{ datasetId: '1' }} />)

      return wrapper.instance()
        .componentWillMount()
        .then(() => {
          expect(wrapper.html()).to.contain(datasetMock.metadata.title)
        })
    })
  })

  describe('If an error occurs', () => {
    it('should render a Errors component', () => {
      const wrapper = shallow(<DatasetDetailLoader params={{}}/>)
      const errors = <Errors errors={['datasetId is required']} />

      return wrapper
        .instance()
        .componentWillMount()
        .then(() => expect(wrapper).to.contain(errors))
    })
  })

})
