import React from 'react'
import { shallow } from 'enzyme'
import { CatalogPreview } from '../CatalogPreview'
import Percent from '../../Statistics/Percent/Percent'
import Counter from '../../Statistics/Counter/Counter'

import catalog from '../../../fetch/__test__/catalog.json'

const translateMock = k => k

describe('<CatalogPreview />', () => {
  describe('metrics is defined', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<CatalogPreview catalog={catalog} t={translateMock} />)
    })

    it('should display the number of records', () => {
      const records = <Counter value={catalog.metrics.records.totalCount} size='small' label='components.CatalogPreview.recordsLabel' />

      expect(wrapper.contains(records)).to.be.true
    })

    it('should display the openness percent', () => {
      const open = <Percent value={catalog.metrics.datasets.partitions['openness'].yes} size='small' label='components.CatalogPreview.openDataLabel' total={catalog.metrics.datasets.totalCount} icon='unlock alternate icon' />

      expect(wrapper.contains(open)).to.be.true
    })

    it('should display the downloadable percent', () => {
      const download = <Percent value={catalog.metrics.datasets.partitions['download'].yes} size='small' label='components.CatalogPreview.downloadableLabel' total={catalog.metrics.datasets.totalCount} icon='download' />

      expect(wrapper.contains(download)).to.be.true
    })
  })
})
