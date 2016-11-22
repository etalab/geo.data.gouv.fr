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
      const records = <Counter value={metrics.records.totalCount} label="Enregistrements" />
      expect(wrapper.contains(records)).toBe(true)
    })

    it('should display the openness percent', () => {
      const open = <Percent value={ metrics.datasets.partitions['openness'].yes} label="Données ouvertes" total={metrics.datasets.totalCount} icon="unlock alternate icon" />
      expect(wrapper.contains(open)).toBe(true)
    })

    it('should display the downloadable percent', () => {
      const download = <Percent value={ metrics.datasets.partitions['download'].yes} label="Téléchargeable" total={metrics.datasets.totalCount} icon="download" />

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
