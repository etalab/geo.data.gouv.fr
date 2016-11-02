import React from 'react'
import { shallow } from 'enzyme'
import CatalogPreview from '../CatalogPreview'
import Percent from '../../../Statistics/Percent/Percent'
import Counter from '../../../Statistics/Counter/Counter'

import metrics from '../../../../fetch/__test__/metrics.json'

describe('<CatalogPreview />', () => {
  describe('metrics is defined', () => {
    let wrapper
    beforeEach(() =>  {
      wrapper = shallow(<CatalogPreview metrics={metrics} />)
    })

    it('should display the number of records', () => {
      const records = <Counter value={metrics.totalCount} label="Records" />
      expect(wrapper.contains(records)).toBe(true)
    })

    it('should display the openness percent', () => {
      const open = <Percent value={ metrics.partitions['openness'].yes} label="Open data" total={metrics.totalCount} icon="unlock alternate icon" />
      console.log(wrapper.debug());
      expect(wrapper.contains(open)).toBe(true)
    })

    it('should display the downloadable percent', () => {
      const download = <Percent value={ metrics.partitions['download'].yes} label="Downloadable" total={metrics.totalCount} icon="download" />

      expect(wrapper.contains(download)).toBe(true)
    })
  })

  describe('metrics is undefined', () => {
    let wrapper
    beforeEach(() =>  {
      wrapper = shallow(<CatalogPreview metrics={undefined} />)
    })

    it('should render an empty div', () => {
      expect(wrapper.html()).toEqual('<div></div>')
    })
  })

})
