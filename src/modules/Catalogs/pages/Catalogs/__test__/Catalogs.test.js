import React from 'react'
import { shallow } from 'enzyme'

import ContentLoader from '../../../../../components/Loader/ContentLoader'
import catalogs from '../../../../../fetch/__test__/catalogs.json'

const Catalogs = require('proxyquire')('../Catalogs', {
  '../../../../fetch/fetch': require('../../../../../fetch/__mocks__/fetch')
}).default

describe('<Catalogs />', () => {

  describe('componentWillMount()', () => {
    it('Should assign catalogs to this.state', () => {
      const wrapper = shallow(<Catalogs />)
      return wrapper
        .instance()
        .componentWillMount()
        .then(() => expect(wrapper.state('catalogs')).to.equal(catalogs))
    })
  })

  it('should render a loader when no catalog is fetch', () => {
    const loader = <ContentLoader />
    const wrapper = shallow(<Catalogs />)
    expect(wrapper.containsMatchingElement(loader)).to.be.true
  })
})
