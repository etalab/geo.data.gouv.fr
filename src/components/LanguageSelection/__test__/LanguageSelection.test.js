import React from 'react'
import { translate } from 'react-i18next'
import LanguageSelection from '../LanguageSelection'
import { mount } from 'enzyme'

import 'common/i18n'

describe('<LanguageSelection />', () => {
  describe('Switch language to english', () => {
    it('should display an english sentence', () => {
      const label = 'Language selection'
      const Component = translate(['LanguageSelection'], {})(LanguageSelection)
      const wrapper = mount(<Component language={'en'} />)

      wrapper.find('select').simulate('change', { target: { value : 'en' } })

      expect(wrapper.html()).to.contain(label)
    })
  })

  describe('Switch language to french', () => {
    it('should display an french sentence', () => {
      const label = 'Sélection de la langue'
      const Component = translate(['LanguageSelection'], {})(LanguageSelection)
      const wrapper = mount(<Component language={'en'} />)

      wrapper.find('select').simulate('change', { target: { value : 'fr' } })

      expect(wrapper.html()).to.contain(label)
    })
  })
})
