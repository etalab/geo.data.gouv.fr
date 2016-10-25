import React from 'react'
import { Link } from 'react-router'
import { shallow } from 'enzyme'
import CatalogsSection from '../CatalogsSection'
import datasetMock from '../../../fetch/__test__/dataset.json'

describe('<CatalogsSection />', () => {

  let wrapper
  beforeEach(() => {
    wrapper = shallow(<CatalogsSection catalogs={datasetMock.catalogs} />)
  })

  it('should display all catalogs with a link', () => {
    datasetMock.catalogs.map( catalog => {
      const link = <Link to={`/catalogs/${catalog}`}>{catalog}</Link>
      return expect(wrapper.containsMatchingElement(link)).toBe(true)
    })
  })

})
