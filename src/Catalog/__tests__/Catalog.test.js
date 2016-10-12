import React from 'react';
import { shallow } from 'enzyme';
import Percent from '../Statistics/Percent/Percent'
import CircularProgress from 'material-ui/CircularProgress'
import Counter from '../Statistics/Counter/Counter'
import Catalog from './Catalog'

jest.mock('../fetch/fetchMetrics');

const goodCatalog = {
  id: "1",
  name: "Géocatalogue national",
  tags: [ ],
  serviceUrl: "http://www.geocatalogue.fr/api-public/servicesRest",
  lastHarvesting: {
  status: "failed",
  recordsFound: 0,
  finishedAt: "2016-09-01T14:03:24.339Z"
  }
}

const badCatalog = {
  id: "0",
  name: "Géocatalogue national",
  tags: [ ],
  serviceUrl: "http://www.geocatalogue.fr/api-public/servicesRest",
  lastHarvesting: {
  status: "failed",
  recordsFound: 0,
  finishedAt: "2016-09-01T14:03:24.339Z"
  }
}

describe('Catalog test', () => {
  it('renders without crashing', () => {
    shallow(<Catalog catalog={goodCatalog} />);
  });

  it('should display the name of the catalog', () => {
    const title = <span className="ui large header">{goodCatalog.name}</span>
    const wrapper = shallow(<Catalog catalog={goodCatalog} />);
    expect(wrapper.contains(title)).toEqual(true);
  });

  it('should display the number of records', () => {
    const records = <Counter value={0} size="small" label="Records" />
    const wrapper = shallow(<Catalog catalog={goodCatalog} />);
    console.log(wrapper.debug());
    expect(wrapper.contains(records)).toEqual(true);
  });

  it('should display the openness percent', () => {
    const open = <Percent value={808} total={833} label="open data" icon="unlock alternate icon" size="small" />
    const wrapper = shallow(<Catalog catalog={goodCatalog} />);
    expect(wrapper.contains(open)).toEqual(true);
  });

  it('should display the downloadable percent', () => {
    const download = <Percent value={728} total={833} label="downloadable" icon="download" size="small" />
    const wrapper = shallow(<Catalog catalog={goodCatalog} />);
    expect(wrapper.contains(download)).toEqual(true);
  });

  it('should display a loading when data are undefined yet.', () => {
    const loader = <CircularProgress size={1} />
    const wrapper = shallow(<Catalog catalog={badCatalog} />);
    expect(wrapper.contains(loader)).toEqual(true);
  });
})
