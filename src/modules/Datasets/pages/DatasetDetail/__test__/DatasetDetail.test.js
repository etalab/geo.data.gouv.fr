import React from 'react'
import { mount, shallow } from 'enzyme'

import CircularProgress from '../../../../../components/CircularProgress/CircularProgress'
import Errors from '../../../../../components/Errors/Errors'
import datasetMock from '../../../../../fetch/__test__/dataset.json'

const DatasetDetail = require('proxyquire')('../DatasetDetail', {
  '../../../../fetch/fetch': require('../../../../../fetch/__mocks__/fetch')
}).default

describe('<DatasetDetail />', () => {

  describe('Loading dataset', () => {
    it('should display a <CircularProgress />', () => {
      const wrapper = mount(<DatasetDetail params={{ datasetId: '1' }} />)
      const progress = <CircularProgress />
      expect(wrapper.containsMatchingElement(progress)).to.be.true
    })
  })

  describe('Loaded dataset', () => {
    it('should display dataset title', () => {
      const wrapper = mount(<DatasetDetail params={{ datasetId: '1' }} />)

      return wrapper.instance()
        .componentWillMount()
        .then(() => {
          const titleBlock = <h1>{datasetMock.metadata.title}</h1>
          expect(wrapper.containsMatchingElement(titleBlock)).to.be.true
        })
    })
  })

  describe('If an error occurs', () => {
    it('should render a Errors component', () => {
      const wrapper = shallow(<DatasetDetail params={{}}/>)
      const errors = <Errors errors={['datasetId is required']} />

      return wrapper
        .instance()
        .componentWillMount()
        .then(() => expect(wrapper).to.contain(errors))
    })
  })

})
