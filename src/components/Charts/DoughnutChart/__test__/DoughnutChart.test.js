import React from 'react';
import { shallow } from 'enzyme';
import { colors } from '../../../../tools.js'
import Percent from '../../../Statistics/Percent/Percent'
import DoughnutChart from '../DoughnutChart'
import data from './data.json'
import formatedData from './formated-data.json'

describe('<DoughnutChart />', () => {
  const wrapper = shallow(<DoughnutChart data={data} />)

  describe('setColor', () => {
    it('Should return a color by index', () => {
      Object.keys(colors).map( color =>
        expect(wrapper.instance().setColor(color)).to.deep.equal(colors[color]))
    });

    it('Should grey color when out range', () => {
      expect(wrapper.instance().setColor(colors.length + 1)).to.deep.equal({name: 'grey', value: '#767676'})
    });
  })

  describe('formatData', () => {
    it('Should return formated data', () => {
      expect(wrapper.instance().formatData(data)).to.deep.equal(formatedData)
    })

    it('Should sort the data in ascending order', () => {
      const descendingData = {
        service: 1,
        nonGeographicDataset: 405,
        dataset: 427
      }

      expect(wrapper.instance().formatData(descendingData)).to.deep.equal(formatedData)
    })
  })

  describe('Specific data behavior', () => {

    it('Should render Percent component when only 1 data', () => {
      const twoDataWrapper = shallow(<DoughnutChart data={{'dataset': 427}} />)
      const percent = <Percent value={100} total={100} label={formatedData[0].label} icon="database icon" />

      expect(twoDataWrapper.containsMatchingElement(percent)).to.deep.equal(true);
    });

    it('Should render Percent component when no data', () => {
      const noDataWrapper = shallow(<DoughnutChart data={{}} />)
      const noData = <h1>Aucune donnée</h1>

      expect(noDataWrapper.contains(noData)).to.deep.equal(true);
    });
  })
})
