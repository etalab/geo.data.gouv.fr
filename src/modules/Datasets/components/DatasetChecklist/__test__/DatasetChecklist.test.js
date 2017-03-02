import React from 'react'
import { shallow } from 'enzyme'

const DatasetChecklist = require('proxyquire')('../DatasetChecklist', {
  '../../../../fetch/fetch': require('../../../../../fetch/__mocks__/fetch')
}).default

const dataset = {
  metadata: {license: 'fr-lo'},
  organizations: ['producteur'],
  dataset: { distributions: [{available: true}] },
}

describe('<DatasetChecklist />', () => {
  describe('All tests are validated', () => {
    describe('Is published on data.gouv.fr', () => {
      it('should display a link to data.gouv.fr', () => {
        dataset.recordId = '1'
        const wrapper = shallow(<DatasetChecklist dataset={dataset} />)

        return wrapper.instance()
          .componentWillMount()
          .then(() => {
            expect(wrapper.text()).to.contain('Consulter le jeu de données sur data.gouv.fr')
          })
      })
    })

    describe('Not published on data.gouv.fr', () => {
      it('should display a message', () => {
        dataset.recordId = null
        const wrapper = shallow(<DatasetChecklist dataset={dataset} />)

        expect(wrapper.text()).to.contain('Ce jeu de données peut être publié sur data.gouv.fr')
      })
    })
  })

  describe('At least one test failed', () => {
    it('should display details', () => {
      dataset.organizations = []
      const wrapper = shallow(<DatasetChecklist dataset={dataset} />)

      expect(wrapper.text()).to.contain('Ce jeu de données ne peut pas être publié sur data.gouv.fr')
    })
  })
})
