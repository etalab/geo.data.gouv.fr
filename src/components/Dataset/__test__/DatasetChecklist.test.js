import React from 'react'
import { shallow } from 'enzyme'
import DatasetChecklist, { _checkArray } from '../DatasetChecklist'
import CheckItem from '../../CheckItem/CheckItem'

describe('<DatasetChecklist />', () => {

  describe('checkLicense()', () => {
    it('should be true for odbl license', () => {
      const dataset = {license: 'odbl'}
      const wrapper = shallow(<DatasetChecklist dataset={dataset} />)

      const valid = wrapper.instance().checkLicense()

      expect(valid).toEqual(<CheckItem name={'Licence'} valid={true} />)
    })

    it('should be true for fr-lo license', () => {
      const dataset = {license: 'fr-lo'}
      const wrapper = shallow(<DatasetChecklist dataset={dataset} />)

      const valid = wrapper.instance().checkLicense()

      expect(valid).toEqual(<CheckItem name={'Licence'} valid={true} />)
    })

    it('should be false for any other licenses and specify the error', () => {
      const dataset = {license: 'unk-license'}
      const wrapper = shallow(<DatasetChecklist dataset={dataset} />)

      const valid = wrapper.instance().checkLicense()

      expect(valid).toEqual(<CheckItem name={'Licence'} valid={false} msg={'La licence unk-license n\'est pas reconnue.'} />)
    })

    it('should be false when license is undefined and specify the error', () => {
      const dataset = {license: undefined}
      const wrapper = shallow(<DatasetChecklist dataset={dataset} />)

      const valid = wrapper.instance().checkLicense()

      expect(valid).toEqual(<CheckItem name={'Licence'} valid={false} msg={'Aucune licence n\'a pu être trouvée.'} />)
    })
  })

  describe('checkProducers()', () => {
    it('should return true when the array contains at least one element', () => {
      const dataset = {organizations: ['producteur']}
      const wrapper = shallow(<DatasetChecklist dataset={dataset} />)

      const result = wrapper.instance().checkProducers()

      expect(result).toEqual(<CheckItem name={'Producteur'} valid={true} />)
    })

    it('should return false when the array contains no elements', () => {
      const dataset = {organizations: []}
      const wrapper = shallow(<DatasetChecklist dataset={dataset} />)

      const result = wrapper.instance().checkProducers()

      expect(result).toEqual(<CheckItem name={'Producteur'} valid={false} />)
    })

    it('should return false when the array is undefined', () => {
      const dataset = {organizations: undefined}
      const wrapper = shallow(<DatasetChecklist dataset={dataset} />)

      const result = wrapper.instance().checkProducers()

      expect(result).toEqual(<CheckItem name={'Producteur'} valid={false} />)
    })
  })

  describe('checkDataAvailability()', () => {
    it('should return true when the array contains at least one element whith available at true', () => {
      const distributions = [{available: true}, {available: false}]
      const dataset = {distributions}
      const wrapper = shallow(<DatasetChecklist dataset={dataset} />)

      const result = wrapper.instance().checkDataAvailability()

      expect(result).toEqual(<CheckItem name={'Disponibilité de la donnée'} valid={true} />)
    })

    it('should return false when the array contains no elements whith available at true', () => {
      const distributions = [{available: false}, {available: false}]
      const dataset = {distributions}
      const wrapper = shallow(<DatasetChecklist dataset={dataset} />)

      const result = wrapper.instance().checkDataAvailability()

      expect(result).toEqual(<CheckItem name={'Disponibilité de la donnée'} valid={false} />)
    })

    it('should return false when the array is empty', () => {
      const distributions = []
      const dataset = {distributions}
      const wrapper = shallow(<DatasetChecklist dataset={dataset} />)

      const result = wrapper.instance().checkDataAvailability()

      expect(result).toEqual(<CheckItem name={'Disponibilité de la donnée'} valid={false} />)
    })

    it('should return false when the array is undefined', () => {
      const dataset = {distributions: undefined}
      const wrapper = shallow(<DatasetChecklist dataset={dataset} />)

      const result = wrapper.instance().checkDataAvailability()

      expect(result).toEqual(<CheckItem name={'Disponibilité de la donnée'} valid={false} />)
    })
  })
})
