import React from 'react';
import { shallow } from 'enzyme';
import Percent from '../../Statistics/Percent/Percent'
import Loader from '../../Loader/Loader'
import Counter from '../../Statistics/Counter/Counter'
import Catalog from '../Catalog'
import { mountWithContext } from '../../../test/jsdom-setup'

import catalog from '../../fetch/__test__/catalog.json'
import metrics from '../../fetch/__test__/metrics.json'
jest.mock('../../fetch/fetch');

describe('<Catalog />', () => {

  describe('When all goes well', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<Catalog catalog={catalog} />)
    })

    it('renders without crashing', () => {
      shallow(<Catalog catalog={catalog} />);
    });

    it('should display the name of the catalog', () => {
      const title = <span className="ui large header">{catalog.name}</span>
      expect(wrapper.contains(title)).toEqual(true);
    });

    it('should display the number of records', () => {
      const wrapper = mountWithContext(<Catalog catalog={catalog} />)
      const records = <Counter value={metrics.totalCount} size="small" label="Records" />

      return wrapper
        .instance()
        .componentWillMount()
        .then(() => expect(wrapper.contains(records)).toEqual(true))
    });

    it('should display the openness percent', () => {
      const open = <Percent value={ metrics.partitions['openness'].yes} total={metrics.totalCount} label="open data" icon="unlock alternate icon" size="small" />
      const wrapper = mountWithContext(<Catalog catalog={catalog} />)

        return wrapper
          .instance()
          .componentWillMount()
          .then(() => expect(wrapper.contains(open)).toEqual(true))
    });

    it('should display the downloadable percent', () => {
      const download = <Percent value={ metrics.partitions['download'].yes} total={metrics.totalCount} label="downloadable" icon="download" size="small" />
      const wrapper = mountWithContext(<Catalog catalog={catalog} />)

        return wrapper
          .instance()
          .componentWillMount()
          .then(() => expect(wrapper.contains(download)).toEqual(true))
    });
  })

  describe('fetch metrics', () => {
    it('should set metrics', () => {
      const wrapper = mountWithContext(<Catalog catalog={catalog} />)
      return wrapper
        .instance()
        .componentWillMount()
        .then(() => expect(wrapper.state('metrics')).toEqual(metrics))
    });

    it('should display a loading.', () => {
      const loader = <Loader component={<div></div>} value={undefined} />
      const wrapper = shallow(<Catalog catalog={catalog} />);
      expect(wrapper.contains(loader)).toEqual(true);
    });
  })

})
