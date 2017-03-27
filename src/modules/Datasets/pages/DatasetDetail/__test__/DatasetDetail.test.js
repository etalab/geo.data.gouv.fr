import React from 'react'
import { shallow } from 'enzyme'

import DatasetSection from '../../../components/DatasetSection/DatasetSection'
import datasetMock from '../../../../../fetch/__test__/dataset.json'

const DatasetDetail = require('proxyquire')('../DatasetDetail', {
  '../../../../fetch/fetch': require('../../../../../fetch/__mocks__/fetch')
}).default

describe('<DatasetDetail />', () => {

  describe('isWarningStatus()', () => {
    it('should return true whan status exist and has consequences', () => {
      datasetMock.metadata.status = 'obsolete'
      const wrapper = shallow(<DatasetDetail dataset={datasetMock} catalogs={[]} />)
      expect(wrapper.instance().isWarningStatus()).to.be.true
    })

    it('should return false when status exist but has no consequences', () => {
      datasetMock.metadata.status = 'completed'
      const wrapper = shallow(<DatasetDetail dataset={datasetMock} catalogs={[]} />)
      expect(wrapper.instance().isWarningStatus()).to.be.false
    })

    it('should return false when status do not exist', () => {
      datasetMock.metadata.status = 'lol'
      const wrapper = shallow(<DatasetDetail dataset={datasetMock} catalogs={[]} />)
      expect(wrapper.instance().isWarningStatus()).to.be.false
    })

    it('should return false when status is not defined', () => {
      datasetMock.metadata.status = undefined
      const wrapper = shallow(<DatasetDetail dataset={datasetMock} catalogs={[]} />)
      expect(wrapper.instance().isWarningStatus()).to.be.false
    })
  })

})
