import React from 'react'
import TranslatedLanguageSelection, { LanguageSelection } from '../LanguageSelection'
import { mount } from 'enzyme'

import 'common/i18n'

describe('<LanguageSelection />', () => {
  describe('Switch language to english', () => {
    it('should display an english sentence', () => {
      const label = 'Language'
      const wrapper = mount(<TranslatedLanguageSelection />)
      const internal = wrapper.find(LanguageSelection)

      internal.instance().changeLanguage('en')

      expect(wrapper.html()).to.contain(label)
    })
  })

  describe('Switch language to french', () => {
    it('should display an french sentence', () => {
      const label = 'Langage'
      const wrapper = mount(<TranslatedLanguageSelection />)
      const internal = wrapper.find(LanguageSelection)

      internal.instance().changeLanguage('fr')

      expect(wrapper.html()).to.contain(label)
    })
  })
})
