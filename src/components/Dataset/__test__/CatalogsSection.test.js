import React from 'react'
import { Link } from 'react-router'
import { shallow } from 'enzyme'
import CatalogsSection from '../CatalogsSection'
import catalogsMock from '../../../fetch/__test__/catalogs.json'

describe('<CatalogsSection />', () => {

  let wrapper
  beforeEach(() => {
    wrapper = shallow(<CatalogsSection catalogs={catalogsMock} />)
  })

  it('should display all catalogs name with a link', () => {
    catalogsMock.map( catalog => {
      const link = <Link to={`/catalogs/${catalog.id}`}>{catalog.name}</Link>
      return expect(wrapper.containsMatchingElement(link)).toBe(true)
    })
  })

})
