import React from 'react'
import { mount, shallow } from 'enzyme'

import CircularProgress from '../../../../../components/CircularProgress/CircularProgress'
import Errors from '../../../../../components/Errors/Errors'

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
    it('should not display a <CircularProgress />', () => {
      const wrapper = mount(<DatasetDetailLoader params={{ datasetId: '1' }} />)
      const progress = <CircularProgress />

      return wrapper.instance()
        .componentWillMount()
        .then(() => {
          expect(wrapper.containsMatchingElement(progress)).to.be.false
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
