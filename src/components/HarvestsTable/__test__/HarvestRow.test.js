import React from 'react'
import { Link } from 'react-router'
import { shallow } from 'enzyme'
import { theme } from '../../../tools'
import HarvestRow from '../HarvestRow'
import { doneSince } from '../../../helpers/doneSince'

import catalog from '../../../fetch/__test__/catalog.json'
import harvest from '../../../fetch/__test__/harvest.json'

describe('<HarvestRow />', () => {
  const harvestSuccessed = harvest[0]
  const harvestFailed = harvest[1]

  describe('doneSince', () => {
    it('Should return the time elapsed since the date sent', () => {
      expect(doneSince(new Date())).toEqual('a few seconds ago')
    })

    it('Should return N/A when no endTime ', () => {
      expect(doneSince()).toEqual('N/A')
    })

    it('Should return N/A when invalid date ', () => {
      expect(doneSince('thisIsNotADate')).toEqual('N/A')
    })
  })

  describe('Harvest status', () => {
    it('Should display successful text', () => {
      const text = <div>Réussi</div>
      const wrapper = shallow(<HarvestRow harvest={harvestSuccessed} previousHarvest={harvestSuccessed} catalog={catalog} />)
      expect(wrapper.containsMatchingElement(text)).toEqual(true)
    })

    it('Should display failed text', () => {
      const text = <div>En échec</div>
      const wrapper = shallow(<HarvestRow harvest={harvestFailed} previousHarvest={harvestFailed} catalog={catalog} />)
      expect(wrapper.containsMatchingElement(text)).toEqual(true)
    })
  })

  describe('Harvest status', () => {
    it('Should render a link to harvest details', () => {
      const link = <Link to={`/catalogs/${catalog.id}/harvest/${harvestSuccessed._id}`}>Détails</Link>
      const wrapper = shallow(<HarvestRow harvest={harvestSuccessed} previousHarvest={harvestSuccessed} catalog={catalog} />)
      expect(wrapper.contains(link)).toEqual(true)
    })
  })
})
