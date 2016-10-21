import React from 'react'
import { shallow } from 'enzyme'
import CatalogPreview from '../CatalogPreview'
import Percent from '../../../Statistics/Percent/Percent'
import Counter from '../../../Statistics/Counter/Counter'

import metrics from '../../../fetch/__test__/metrics.json'

describe('<CatalogPreviewPreview />', () => {
  const styles = {
    stat: {
      margin: '2em',
    }
  }

  describe('metrics is defined', () => {
    let wrapper
    beforeEach(() =>  {
      wrapper = shallow(<CatalogPreview metrics={metrics} />)
    })

    it('should display the number of records', () => {
      const records = <Counter style={styles.stat} value={metrics.totalCount} size="small" label="Records" />

      expect(wrapper.contains(records)).toBe(true)
    })

    it('should display the openness percent', () => {
      const open = <Percent style={styles.stat} value={ metrics.partitions['openness'].yes} total={metrics.totalCount} label="open data" icon="unlock alternate icon" size="small" />

      expect(wrapper.contains(open)).toBe(true)
    })

    it('should display the downloadable percent', () => {
      const download = <Percent style={styles.stat} value={ metrics.partitions['download'].yes} total={metrics.totalCount} label="downloadable" icon="download" size="small" />

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
