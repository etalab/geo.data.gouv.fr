import React from 'react'
import Errors from '../Errors'
import { shallow } from 'enzyme'

describe('<Errors />', () => {

  describe('Only one error', () => {

    it('should display a sentence in the singular', () => {
      const error = ['une erreur']
      const title = <h3>Une erreur est survenue :</h3>
      const wrapper = shallow(<Errors errors={error} />)

      expect(wrapper).to.contain(title)
    })
  })

  describe('Several errors', () => {

    it('Should display a sentence in the plural', () => {
      const errors = ['une erreur', 'une deuxième erreur']
      const title = <h3>Des erreurs sont survenues :</h3>
      const wrapper = shallow(<Errors errors={errors} />)

      expect(wrapper).to.contain(title)
    })
  })

  describe('When at least one error exists', () => {
    it('Should display all errors', () => {
      const errors = ['une erreur', 'une deuxième erreur']
      const error1 = <div>une erreur</div>
      const error2 = <div>une deuxième erreur</div>
      const wrapper = shallow(<Errors errors={errors} />)

      expect(wrapper).to.contain(error1)
      expect(wrapper).to.contain(error2)
    })
  })
})
