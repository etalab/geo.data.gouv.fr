import React from 'react';
import { shallow } from 'enzyme';
import Percent from '../../Statistics/Percent/Percent'
import CircularProgress from 'material-ui/CircularProgress'
import Counter from '../../Statistics/Counter/Counter'
import Catalog from '../Catalog'
import { mountWithContext } from '../../../test/jsdom-setup'

import catalog from './catalog.json'
import metrics from './metrics.json'
jest.mock('../../fetch/fetchMetrics');

describe('<Catalog />', () => {

  describe('When all goes well', () => {
    const wrapper = shallow(<Catalog catalog={catalog} />);
    it('renders without crashing', () => {
      shallow(<Catalog catalog={catalog} />);
    });

    it('should display the name of the catalog', () => {
      const title = <span className="ui large header">{catalog.name}</span>
      expect(wrapper.contains(title)).toEqual(true);
    });

    it('should display the number of records', () => {
      const records = <Counter value={0} size="small" label="Records" />
      expect(wrapper.contains(records)).toEqual(true);
    });

    it('should display the openness percent', () => {
      const open = <Percent value={808} total={833} label="open data" icon="unlock alternate icon" size="small" />

      wrapper.setState({metrics: metrics});

      expect(wrapper.contains(open)).toEqual(true);
    });

    it('should display the downloadable percent', () => {
      const download = <Percent value={728} total={833} label="downloadable" icon="download" size="small" />

      wrapper.setState({metrics: metrics});

      expect(wrapper.contains(download)).toEqual(true);
    });
  })

  describe('fetch metrics', () => {
    it('should set metrics', () => {
      const wrapper = mountWithContext(<Catalog catalog={catalog} />)
      wrapper
        .instance()
        .componentWillMount()
        .then(() => expect(wrapper.state('metrics')).toEqual(metrics))
    });

    it('should display a loading.', () => {
      const loader = <CircularProgress size={1} />
      const wrapper = shallow(<Catalog catalog={catalog} />);
      expect(wrapper.contains(loader)).toEqual(true);
    });
  })

})
