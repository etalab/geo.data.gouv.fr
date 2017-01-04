import React from 'react'
import { shallow, mount } from 'enzyme'
import UpdateHealth from '../UpdateHealth'

describe('<UpdateHealth />', () => {
  describe('Obsolescence', () => {
    describe('When cataog is obsolete', () => {
      it('should render <ObsoleteWarning />', () => {
        const catalog = { metrics: { mostRecentRevisionDate: new Date('1970-01-01') }, service: { sync: { status: 'success' } } }
        const msg = 'Ce catalogue n\'a pas été mis à jour depuis plus de 6 mois'
        const wrapper = mount(<UpdateHealth catalog={catalog} />)

        expect(wrapper.text()).to.contain(msg)
      })
    })

    describe('When cataog is not obsolete', () => {
      it('should display a success message', () => {
        const catalog = { metrics: { mostRecentRevisionDate: new Date() }, service: { sync: { status: 'success' } } }
        const msg = 'Ce catalogue est tenu à jour'
        const wrapper = shallow(<UpdateHealth catalog={catalog} />)

        expect(wrapper.text()).to.contain(msg)
      })
    })
  })
})
