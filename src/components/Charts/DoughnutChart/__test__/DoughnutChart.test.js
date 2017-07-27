import React from 'react';
import { shallow } from 'enzyme';
import Percent from '../../../Statistics/Percent/Percent'
import { DoughnutChart, formatData } from '../DoughnutChart'
import data from './data.json'
import formatedData from './formated-data.json'

const t = k => k

describe('<DoughnutChart />', () => {
  describe('formatData', () => {
    it('Should return formated data', () => {
      expect(formatData(data, t)).to.deep.equal(formatedData)
    })

    it('Should sort the data in ascending order', () => {
      const descendingData = {
        service: 1,
        nonGeographicDataset: 405,
        dataset: 427
      }

      expect(formatData(descendingData, t)).to.deep.equal(formatedData)
    })
  })

  describe('Specific data behavior', () => {

    it('Should render Percent component when only 1 data', () => {
      const twoDataWrapper = shallow(<DoughnutChart data={{'dataset': 427}} t={t} />)
      const percent = <Percent value={100} total={100} label={formatedData.labels[0]} icon="database icon" />

      expect(twoDataWrapper.containsMatchingElement(percent)).to.deep.equal(true);
    });

    it('Should render Percent component when no data', () => {
      const noDataWrapper = shallow(<DoughnutChart data={{}} t={t} />)
      const noData = <h1>no_data</h1>

      expect(noDataWrapper.contains(noData)).to.deep.equal(true);
    });
  })
})
