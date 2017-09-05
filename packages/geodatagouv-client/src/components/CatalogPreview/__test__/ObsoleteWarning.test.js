import React from 'react'
import { shallow } from 'enzyme'
import { ObsoleteWarning } from '../ObsoleteWarning'

const translateMock = k => k

function shallowForCatalog(catalog) {
  return shallow(<ObsoleteWarning catalog={catalog} currentDate={new Date('2016-07-15')} t={translateMock} />)
}

describe('<ObsoleteWarning />', () => {
  describe('catalog has no mostRecentRevisionDate metric', () => {
    it('should display nothing', () => {
      const wrapper = shallowForCatalog({})
      expect(wrapper.text()).to.be.empty
    })
  })

  describe('mostRecentRevisionDate is older than 6 months', () => {
    it('should display the warning', () => {
      const wrapper = shallowForCatalog({ metrics: { mostRecentRevisionDate: new Date('2011-06-01') } })
      expect(wrapper.text()).to.contain('ObsoleteWarning.obsoleteCatalog')
    })
  })

  describe('mostRecentRevisionDate is more recent than 6 months', () => {
    it('should display nothing', () => {
      const wrapper = shallowForCatalog({ metrics: { mostRecentRevisionDate: new Date('2016-06-01') } })
      expect(wrapper.text()).to.be.empty
    })
  })
})
