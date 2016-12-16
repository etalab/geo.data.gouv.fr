import React from 'react'
import { shallow } from 'enzyme'
import ObsoleteWarning from '../ObsoleteWarning'

function shallowForCatalog(catalog) {
  return shallow(<ObsoleteWarning catalog={catalog} refDate={new Date('2016-07-15')} />)
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
      expect(wrapper.text()).to.contain('pas été mis à jour depuis plus de 6 mois')
    })
  })

  describe('mostRecentRevisionDate is more recent than 6 months', () => {
    it('should display nothing', () => {
      const wrapper = shallowForCatalog({ metrics: { mostRecentRevisionDate: new Date('2016-06-01') } })
      expect(wrapper.text()).to.be.empty
    })
  })
})
