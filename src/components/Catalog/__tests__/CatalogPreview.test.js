import React from 'react'
import { shallow } from 'enzyme'
import CatalogPreview from '../CatalogPreview'
import Percent from '../../Statistics/Percent/Percent'
import Counter from '../../Statistics/Counter/Counter'

import catalog from '../../../fetch/__test__/catalog.json'

describe('<CatalogPreview />', () => {
  describe('metrics is defined', () => {
    let wrapper
    beforeEach(() =>  {
      wrapper = shallow(<CatalogPreview catalog={catalog} />)
    })

    it('should display the number of records', () => {
      const records = <Counter value={catalog.metrics.records.totalCount} label="Enregistrements" />
      expect(wrapper.contains(records)).to.be.true
    })

    it('should display the openness percent', () => {
      const open = <Percent value={ catalog.metrics.datasets.partitions['openness'].yes} label="Données ouvertes" total={catalog.metrics.datasets.totalCount} icon="unlock alternate icon" />
      expect(wrapper.contains(open)).to.be.true
    })

    it('should display the downloadable percent', () => {
      const download = <Percent value={ catalog.metrics.datasets.partitions['download'].yes} label="Téléchargeable" total={catalog.metrics.datasets.totalCount} icon="download" />

      expect(wrapper.contains(download)).to.be.true
    })
  })

})
