import React from 'react'
import { mount } from 'enzyme'
import CatalogPreview from '../CatalogPreview'
import Percent from '../../Statistics/Percent/Percent'
import Counter from '../../Statistics/Counter/Counter'

import setupI18n from 'common/i18n'
import catalog from '../../../fetch/__test__/catalog.json'

const context = {
  i18n: setupI18n()
}

describe('<CatalogPreview />', () => {
  describe('metrics is defined', () => {
    let wrapper
    beforeEach(() => {
      wrapper = mount(<CatalogPreview catalog={catalog} />, { context })
    })

    it('should display the number of records', () => {
      const records = <Counter value={catalog.metrics.records.totalCount} size='small' label='Records' />
      expect(wrapper.contains(records)).to.be.true
    })

    it('should display the openness percent', () => {
      const open = <Percent value={catalog.metrics.datasets.partitions['openness'].yes} size='small' label='Open data' total={catalog.metrics.datasets.totalCount} icon='unlock alternate icon' />
      expect(wrapper.contains(open)).to.be.true
    })

    it('should display the downloadable percent', () => {
      const download = <Percent value={catalog.metrics.datasets.partitions['download'].yes} size='small' label='Downloadable' total={catalog.metrics.datasets.totalCount} icon='download' />

      expect(wrapper.contains(download)).to.be.true
    })
  })
})
