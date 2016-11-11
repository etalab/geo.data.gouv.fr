import React from 'react';
import { Link } from 'react-router'
import { shallow } from 'enzyme';
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
    });

    it('Should return N/A when no endTime ', () => {
      expect(doneSince()).toEqual('N/A')
    });

    it('Should return N/A when invalid date ', () => {
      expect(doneSince('thisIsNotADate')).toEqual('N/A')
    });
  })

  describe('Harvest status', () => {
    it('Should display green successful label', () => {
      const label = <div className="ui green circular label" >successful</div>
      const wrapper = shallow(<HarvestRow harvest={harvestSuccessed} previousHarvest={harvestSuccessed} catalog={catalog} />)
      expect(wrapper.contains(label)).toEqual(true)
    });

    it('Should display red failed label', () => {
      const label = <div className="ui red circular label" >failed</div>
      const wrapper = shallow(<HarvestRow harvest={harvestFailed} previousHarvest={harvestFailed} catalog={catalog} />)
      expect(wrapper.contains(label)).toEqual(true)
    });
  })

  describe('Harvest status', () => {
    it('Should render a link to harvest details', () => {
      const link = <Link to={`/catalogs/${catalog.id}/harvest/${harvestSuccessed._id}`}>More</Link>
      const wrapper = shallow(<HarvestRow harvest={harvestSuccessed} previousHarvest={harvestSuccessed} catalog={catalog} />)
      expect(wrapper.contains(link)).toEqual(true)
    });
  })
})
